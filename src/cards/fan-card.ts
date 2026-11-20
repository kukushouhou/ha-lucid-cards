import { resolveLang, t, type LangCode } from "../i18n";
import { BASE_CARD_STYLES } from "../styles";
import type { HomeAssistant, LucidFanCardConfig } from "../types";

const FAN_STYLES = `
  ${BASE_CARD_STYLES}
  .icon-wrap.on {
    background: rgba(16, 185, 129, 0.16);
    color: #10b981;
  }
  .switch-track.on {
    background: #10b981;
  }
  .gears-grid {
    display: grid;
    gap: 5px;
  }
  .gears-grid.hidden {
    display: none;
  }
  .gear-btn {
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.22));
    background: transparent;
    color: var(--primary-text-color);
    border-radius: 6px;
    padding: 4px 2px;
    font-size: 11.5px;
    line-height: 1.15;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }
  .gear-btn:hover {
    border-color: #10b981;
  }
  .gear-btn.active {
    background: #10b981;
    border-color: #10b981;
    color: #ffffff;
    font-weight: 500;
  }
`;

export class LucidFanCard extends HTMLElement {
  private _config: LucidFanCardConfig | null = null;
  private _hass: HomeAssistant | null = null;
  private _rendered = false;
  private _gearCount = 0;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("lucid-fan-card-editor");
  }

  static getStubConfig(hass?: HomeAssistant): LucidFanCardConfig {
    const firstFan = hass
      ? Object.keys(hass.states).find((id) => id.startsWith("fan."))
      : undefined;
    return {
      type: "custom:lucid-fan-card",
      entity: firstFan || "fan.example",
    };
  }

  setConfig(config: LucidFanCardConfig): void {
    if (!config || !config.entity) {
      throw new Error("Entity is required for lucid-fan-card");
    }
    this._config = config;
    this._gearCount = 0;
    this._ensureDom();
    this._update();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._ensureDom();
    this._update();
  }

  get hass(): HomeAssistant | null {
    return this._hass;
  }

  getCardSize(): number {
    return 2;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto" as const,
    };
  }

  private _lang(): LangCode {
    return resolveLang(this._hass, this._config?.language);
  }

  private _computeGearCount(attrs: Record<string, any>): number {
    if (this._config?.gears && this._config.gears >= 2 && this._config.gears <= 8) {
      return Math.round(this._config.gears);
    }
    const step = Number(attrs.percentage_step || 0);
    if (step >= 12.5 && step <= 50) {
      return Math.max(2, Math.min(8, Math.round(100 / step)));
    }
    if (step > 0 && step < 12.5) {
      // Stepless 1% DC fan: expose 5 clean speed buttons (20%..100%)
      return 5;
    }
    return 6;
  }

  private _ensureDom(): void {
    if (this._rendered || !this.shadowRoot) return;
    this._rendered = true;
    this.shadowRoot.innerHTML = `
      <style>${FAN_STYLES}</style>
      <ha-card>
        <div class="top-row">
          <div class="left-info" id="infoArea">
            <div class="icon-wrap" id="iconWrap">
              <ha-icon id="iconEl" icon="mdi:fan"></ha-icon>
            </div>
            <div class="titles">
              <div class="name" id="nameEl"></div>
              <div class="sub" id="subEl"></div>
            </div>
          </div>
          <button class="switch-btn" id="toggleBtn" type="button" aria-label="Toggle Fan">
            <div class="switch-track" id="swTrack"><div class="switch-thumb"></div></div>
          </button>
        </div>
        <div class="gears-grid bottom-sep" id="gearsGrid"></div>
      </ha-card>
    `;

    const root = this.shadowRoot;
    const toggleFn = (e: Event) => {
      e.stopPropagation();
      if (this._hass && this._config) {
        this._hass.callService("fan", "toggle", { entity_id: this._config.entity });
      }
    };
    root.getElementById("toggleBtn")!.addEventListener("click", toggleFn);
    root.getElementById("infoArea")!.addEventListener("click", toggleFn);
    root.getElementById("infoArea")!.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (!this._config) return;
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId: this._config.entity },
        })
      );
    });
  }

  private _rebuildGears(count: number, lang: LangCode): void {
    const grid = this.shadowRoot!.getElementById("gearsGrid")!;
    grid.style.gridTemplateColumns = `repeat(${count}, minmax(0, 1fr))`;
    grid.innerHTML = "";
    for (let i = 1; i <= count; i++) {
      const pct = Math.min(100, Math.round((i / count) * 100));
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gear-btn";
      btn.dataset.gear = String(i);
      btn.dataset.pct = String(pct);
      btn.textContent = t(lang, "fan_gear", { n: i });
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!this._hass || !this._config) return;
        this._hass.callService("fan", "set_percentage", {
          entity_id: this._config.entity,
          percentage: pct,
        });
      });
      grid.appendChild(btn);
    }
    this._gearCount = count;
  }

  private _update(): void {
    if (!this._rendered || !this._config || !this._hass || !this.shadowRoot) return;
    const root = this.shadowRoot;
    const lang = this._lang();
    const st = this._hass.states[this._config.entity];

    const nameEl = root.getElementById("nameEl")!;
    const subEl = root.getElementById("subEl")!;
    const iconEl = root.getElementById("iconEl")!;
    const iconWrap = root.getElementById("iconWrap")!;
    const swTrack = root.getElementById("swTrack")!;
    const gearsGrid = root.getElementById("gearsGrid")!;

    if (!st) {
      nameEl.textContent = this._config.name || this._config.entity;
      subEl.textContent = t(lang, "missing_entity");
      gearsGrid.classList.add("hidden");
      return;
    }

    const attrs = st.attributes || {};
    iconEl.setAttribute("icon", this._config.icon || attrs.icon || "mdi:fan");
    nameEl.textContent = this._config.name || attrs.friendly_name || this._config.entity;

    if (st.state === "unavailable") {
      subEl.textContent = t(lang, "unavailable");
      iconWrap.classList.remove("on");
      swTrack.classList.remove("on");
      return;
    }

    const gears = this._computeGearCount(attrs);
    if (this._gearCount !== gears) {
      this._rebuildGears(gears, lang);
    } else {
      gearsGrid.querySelectorAll<HTMLButtonElement>(".gear-btn").forEach((b) => {
        b.textContent = t(lang, "fan_gear", { n: Number(b.dataset.gear) });
      });
    }
    gearsGrid.classList.remove("hidden");

    const isOn = st.state === "on";
    const pct = Number(attrs.percentage || 0);
    const activeGear =
      isOn && pct > 0 ? Math.max(1, Math.min(gears, Math.round((pct / 100) * gears))) : 0;

    iconWrap.classList.toggle("on", isOn);
    swTrack.classList.toggle("on", isOn);

    if (!isOn) {
      subEl.textContent = t(lang, "fan_off_hint");
    } else if (activeGear > 0) {
      subEl.textContent = t(lang, "fan_current_gear", { n: activeGear });
    } else {
      subEl.textContent = t(lang, "on");
    }

    gearsGrid.querySelectorAll<HTMLButtonElement>(".gear-btn").forEach((b) => {
      const g = Number(b.dataset.gear);
      b.classList.toggle("active", isOn && g === activeGear);
    });
  }
}
