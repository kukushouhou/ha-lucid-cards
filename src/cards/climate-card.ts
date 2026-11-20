import { resolveLang, t, type DictKey, type LangCode } from "../i18n";
import { BASE_CARD_STYLES } from "../styles";
import type { HomeAssistant, LucidClimateCardConfig } from "../types";

const CLIMATE_STYLES = `
  ${BASE_CARD_STYLES}
  .icon-wrap.mode-cool {
    background: rgba(59, 130, 246, 0.18);
    color: #3b82f6;
  }
  .icon-wrap.mode-heat {
    background: rgba(249, 115, 22, 0.18);
    color: #f97316;
  }
  .icon-wrap.mode-dry {
    background: rgba(6, 182, 212, 0.18);
    color: #06b6d4;
  }
  .icon-wrap.mode-fan_only {
    background: rgba(16, 185, 129, 0.18);
    color: #10b981;
  }
  .icon-wrap.mode-auto,
  .icon-wrap.mode-heat_cool {
    background: rgba(139, 92, 246, 0.18);
    color: #8b5cf6;
  }
  .stepper {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }
  .stepper.hidden {
    display: none;
  }
  .step-btn {
    width: 22px;
    height: 22px;
    border-radius: 5px;
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.24));
    background: transparent;
    color: var(--primary-text-color);
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
  }
  .step-btn:hover {
    border-color: var(--primary-color, #3b82f6);
  }
  .target-temp {
    font-size: 12.5px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    min-width: 36px;
    text-align: center;
    white-space: nowrap;
    color: var(--primary-text-color);
  }
  .modes-grid {
    display: grid;
    gap: 5px;
  }
  .modes-grid.hidden {
    display: none;
  }
  .mode-btn {
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
  .mode-btn.active {
    background: var(--mode-accent, #3b82f6);
    border-color: var(--mode-accent, #3b82f6);
    color: #ffffff;
    font-weight: 500;
  }
  .switch-btn.hidden {
    display: none;
  }
  .switch-track.on {
    background: var(--mode-accent, #3b82f6);
  }
`;

const MODE_ORDER = ["off", "cool", "heat", "heat_cool", "auto", "dry", "fan_only"];

const MODE_COLORS: Record<string, string> = {
  off: "#64748b",
  cool: "#3b82f6",
  heat: "#f97316",
  dry: "#06b6d4",
  fan_only: "#10b981",
  auto: "#8b5cf6",
  heat_cool: "#8b5cf6",
};

const MODE_ICONS: Record<string, string> = {
  off: "mdi:air-conditioner",
  cool: "mdi:snowflake",
  heat: "mdi:fire",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  auto: "mdi:thermostat-auto",
  heat_cool: "mdi:thermostat-auto",
};

export class LucidClimateCard extends HTMLElement {
  private _config: LucidClimateCardConfig | null = null;
  private _hass: HomeAssistant | null = null;
  private _rendered = false;
  private _modesKey = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("lucid-climate-card-editor");
  }

  static getStubConfig(hass?: HomeAssistant): LucidClimateCardConfig {
    const firstClimate = hass
      ? Object.keys(hass.states).find((id) => id.startsWith("climate."))
      : undefined;
    return {
      type: "custom:lucid-climate-card",
      entity: firstClimate || "climate.example",
    };
  }

  setConfig(config: LucidClimateCardConfig): void {
    if (!config || !config.entity) {
      throw new Error("Entity is required for lucid-climate-card");
    }
    this._config = config;
    this._modesKey = "";
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
    return this._config?.compact ? 1 : 2;
  }

  getGridOptions() {
    return {
      columns: this._config?.compact ? 6 : 12,
      min_columns: 6,
      rows: "auto" as const,
    };
  }

  private _lang(): LangCode {
    return resolveLang(this._hass, this._config?.language);
  }

  private _modeLabel(mode: string, lang: LangCode): string {
    const map: Record<string, DictKey> = {
      off: "ac_mode_off",
      cool: "ac_mode_cool",
      heat: "ac_mode_heat",
      heat_cool: "ac_mode_heat_cool",
      auto: "ac_mode_auto",
      dry: "ac_mode_dry",
      fan_only: "ac_mode_fan_only",
    };
    return map[mode] ? t(lang, map[mode]) : mode;
  }

  private _ensureDom(): void {
    if (this._rendered || !this.shadowRoot) return;
    this._rendered = true;
    this.shadowRoot.innerHTML = `
      <style>${CLIMATE_STYLES}</style>
      <ha-card>
        <div class="top-row">
          <div class="left-info" id="infoArea">
            <div class="icon-wrap" id="iconWrap">
              <ha-icon id="iconEl" icon="mdi:air-conditioner"></ha-icon>
            </div>
            <div class="titles">
              <div class="name" id="nameEl"></div>
              <div class="sub" id="subEl"></div>
            </div>
          </div>
          <div class="stepper" id="stepper">
            <button class="step-btn" id="minusBtn" type="button" aria-label="Decrease Temperature">−</button>
            <span class="target-temp" id="targetTemp">--</span>
            <button class="step-btn" id="plusBtn" type="button" aria-label="Increase Temperature">+</button>
          </div>
          <button class="switch-btn hidden" id="compactToggleBtn" type="button" aria-label="Toggle Climate">
            <div class="switch-track compact" id="swTrack"><div class="switch-thumb"></div></div>
          </button>
        </div>
        <div class="modes-grid bottom-sep" id="modesGrid"></div>
      </ha-card>
    `;

    const root = this.shadowRoot;
    const openMoreInfo = (e: Event) => {
      e.preventDefault();
      if (!this._config) return;
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId: this._config.entity },
        })
      );
    };
    root.getElementById("infoArea")!.addEventListener("click", openMoreInfo);
    root.getElementById("infoArea")!.addEventListener("contextmenu", openMoreInfo);

    root.getElementById("minusBtn")!.addEventListener("click", (e) => {
      e.stopPropagation();
      this._stepTemperature(-1);
    });
    root.getElementById("plusBtn")!.addEventListener("click", (e) => {
      e.stopPropagation();
      this._stepTemperature(1);
    });
    root.getElementById("compactToggleBtn")!.addEventListener("click", (e) => {
      e.stopPropagation();
      this._toggleClimate();
    });
  }

  private _toggleClimate(): void {
    if (!this._hass || !this._config) return;
    const st = this._hass.states[this._config.entity];
    if (!st) return;
    if (st.state !== "off") {
      this._hass.callService("climate", "turn_off", {
        entity_id: this._config.entity,
      });
    } else {
      const modes: string[] = Array.isArray(st.attributes?.hvac_modes)
        ? st.attributes.hvac_modes
        : [];
      const preferred = ["cool", "heat_cool", "auto", "heat", "dry", "fan_only"].find((m) =>
        modes.includes(m)
      );
      if (preferred) {
        this._hass.callService("climate", "set_hvac_mode", {
          entity_id: this._config.entity,
          hvac_mode: preferred,
        });
      } else {
        this._hass.callService("climate", "turn_on", {
          entity_id: this._config.entity,
        });
      }
    }
  }

  private _stepTemperature(dir: -1 | 1): void {
    if (!this._hass || !this._config) return;
    const st = this._hass.states[this._config.entity];
    if (!st) return;
    const attrs = st.attributes || {};
    const step = Number(this._config.step || attrs.target_temp_step || 0.5);
    const minT = Number(attrs.min_temp ?? 16);
    const maxT = Number(attrs.max_temp ?? 30);
    const curT = Number(attrs.temperature ?? 25);
    const next = Math.min(maxT, Math.max(minT, Math.round((curT + dir * step) * 10) / 10));
    this._hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: next,
    });
  }

  private _rebuildModes(modes: string[], lang: LangCode): void {
    const grid = this.shadowRoot!.getElementById("modesGrid")!;
    grid.style.gridTemplateColumns = `repeat(${modes.length}, minmax(0, 1fr))`;
    grid.innerHTML = "";
    for (const m of modes) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mode-btn";
      btn.dataset.mode = m;
      btn.textContent = this._modeLabel(m, lang);
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!this._hass || !this._config) return;
        this._hass.callService("climate", "set_hvac_mode", {
          entity_id: this._config.entity,
          hvac_mode: m,
        });
      });
      grid.appendChild(btn);
    }
    this._modesKey = `${lang}:${modes.join(",")}`;
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
    const stepper = root.getElementById("stepper")!;
    const compactToggleBtn = root.getElementById("compactToggleBtn")!;
    const swTrack = root.getElementById("swTrack")!;
    const targetTemp = root.getElementById("targetTemp")!;
    const modesGrid = root.getElementById("modesGrid")!;

    if (!st) {
      nameEl.textContent = this._config.name || this._config.entity;
      subEl.textContent = t(lang, "missing_entity");
      stepper.classList.add("hidden");
      compactToggleBtn.classList.add("hidden");
      modesGrid.classList.add("hidden");
      return;
    }

    const attrs = st.attributes || {};
    const state = st.state;
    const isCompact = Boolean(this._config.compact);
    nameEl.textContent = this._config.name || attrs.friendly_name || this._config.entity;
    iconEl.setAttribute(
      "icon",
      this._config.icon || MODE_ICONS[state] || attrs.icon || "mdi:air-conditioner"
    );

    iconWrap.className = `icon-wrap ${state && state !== "off" ? `mode-${state}` : ""}`;

    if (state === "unavailable") {
      subEl.textContent = t(lang, "unavailable");
      stepper.classList.add("hidden");
      compactToggleBtn.classList.add("hidden");
      return;
    }

    const hasTarget = attrs.temperature != null;
    const fmtTarget = hasTarget
      ? `${Number.isInteger(Number(attrs.temperature)) ? Number(attrs.temperature).toFixed(0) : Number(attrs.temperature).toFixed(1)}°`
      : null;

    stepper.classList.toggle("hidden", isCompact || !hasTarget);
    compactToggleBtn.classList.toggle("hidden", !isCompact);
    if (hasTarget) {
      targetTemp.textContent = fmtTarget!;
    }

    const accent = MODE_COLORS[state] || "#3b82f6";
    const isOn = state !== "off";
    swTrack.style.setProperty("--mode-accent", accent);
    swTrack.classList.toggle("on", isOn);

    const curRoom = attrs.current_temperature;
    const stateTxt =
      state === "off" ? t(lang, "ac_state_off") : this._modeLabel(state, lang);
    if (isCompact) {
      const tempPart = isOn ? fmtTarget || (curRoom != null ? `${curRoom}°` : "") : curRoom != null ? `${curRoom}°` : fmtTarget || "";
      subEl.textContent = tempPart ? `${stateTxt} · ${tempPart}` : stateTxt;
      modesGrid.classList.add("hidden");
      return;
    }

    subEl.textContent =
      curRoom != null
        ? `${stateTxt} · ${t(lang, "ac_room", { t: curRoom })}`
        : stateTxt;

    const rawModes: string[] = Array.isArray(this._config.modes)
      ? this._config.modes
      : Array.isArray(attrs.hvac_modes)
        ? attrs.hvac_modes
        : ["off", "cool", "heat", "dry", "fan_only"];
    const sortedModes = [...rawModes].sort((a, b) => {
      const ia = MODE_ORDER.indexOf(a);
      const ib = MODE_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    const key = `${lang}:${sortedModes.join(",")}`;
    if (this._modesKey !== key && sortedModes.length > 0) {
      this._rebuildModes(sortedModes, lang);
    }
    modesGrid.classList.toggle("hidden", sortedModes.length === 0);

    modesGrid.style.setProperty("--mode-accent", accent);
    modesGrid.querySelectorAll<HTMLButtonElement>(".mode-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.mode === state);
    });
  }
}
