import { resolveLang, t, type LangCode } from "../i18n";
import { BASE_CARD_STYLES } from "../styles";
import type { HomeAssistant, LucidLightCardConfig } from "../types";

const LIGHT_STYLES = `
  ${BASE_CARD_STYLES}
  .icon-wrap.on {
    background: rgba(245, 158, 11, 0.18);
    color: #f59e0b;
  }
  .switch-track.on {
    background: #f59e0b;
  }
  .sliders-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 12px;
  }
  .sliders-grid.single {
    grid-template-columns: minmax(0, 1fr);
  }
  .sliders-grid.hidden {
    display: none;
  }
  .sliders-grid.off-dim {
    opacity: 0.68;
  }
  .slider-col {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .slider-col.hidden {
    display: none;
  }
  .slider-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    font-size: 11px;
    line-height: 1.15;
    white-space: nowrap;
  }
  .slider-lbl {
    color: var(--secondary-text-color);
    white-space: nowrap;
  }
  .slider-val {
    color: var(--primary-text-color);
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 999px;
    outline: none;
    cursor: pointer;
    margin: 0;
    display: block;
  }
  input[type="range"].bri-slider {
    background: linear-gradient(
      90deg,
      #f59e0b var(--bri-pct, 0%),
      rgba(127, 127, 127, 0.24) var(--bri-pct, 0%)
    );
  }
  input[type="range"].temp-slider {
    background: linear-gradient(90deg, #ffb74d 0%, #fff3e0 50%, #90caf9 100%);
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #ffffff;
    border: 1.5px solid rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }
  input[type="range"]::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #ffffff;
    border: 1.5px solid rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }
`;

export class LucidLightCard extends HTMLElement {
  private _config: LucidLightCardConfig | null = null;
  private _hass: HomeAssistant | null = null;
  private _rendered = false;
  private _draggingBri = false;
  private _draggingTemp = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("lucid-light-card-editor");
  }

  static getStubConfig(hass?: HomeAssistant): LucidLightCardConfig {
    const firstLight = hass
      ? Object.keys(hass.states).find((id) => id.startsWith("light."))
      : undefined;
    return {
      type: "custom:lucid-light-card",
      entity: firstLight || "light.example",
    };
  }

  setConfig(config: LucidLightCardConfig): void {
    if (!config || !config.entity) {
      throw new Error("Entity is required for lucid-light-card");
    }
    this._config = config;
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

  private _kelvinWord(k: number, lang: LangCode): string {
    if (k <= 3500) return t(lang, "warm");
    if (k >= 5300) return t(lang, "cool");
    return t(lang, "neutral");
  }

  private _ensureDom(): void {
    if (this._rendered || !this.shadowRoot) return;
    this._rendered = true;
    this.shadowRoot.innerHTML = `
      <style>${LIGHT_STYLES}</style>
      <ha-card>
        <div class="top-row">
          <div class="left-info" id="infoArea">
            <div class="icon-wrap" id="iconWrap">
              <ha-icon id="iconEl" icon="mdi:ceiling-light"></ha-icon>
            </div>
            <div class="titles">
              <div class="name" id="nameEl"></div>
              <div class="sub" id="subEl"></div>
            </div>
          </div>
          <button class="switch-btn" id="toggleBtn" type="button" aria-label="Toggle Light">
            <div class="switch-track" id="swTrack"><div class="switch-thumb"></div></div>
          </button>
        </div>
        <div class="sliders-grid bottom-sep" id="slidersGrid">
          <div class="slider-col" id="briCol">
            <div class="slider-head">
              <span class="slider-lbl" id="briLbl"></span>
              <span class="slider-val" id="briVal"></span>
            </div>
            <input type="range" class="bri-slider" id="briSlider" min="1" max="100" value="100" />
          </div>
          <div class="slider-col" id="tempCol">
            <div class="slider-head">
              <span class="slider-lbl" id="tempLbl"></span>
              <span class="slider-val" id="tempVal"></span>
            </div>
            <input type="range" class="temp-slider" id="tempSlider" min="2700" max="6500" step="100" value="4500" />
          </div>
        </div>
      </ha-card>
    `;

    const root = this.shadowRoot;
    const toggleFn = (e: Event) => {
      e.stopPropagation();
      if (!this._hass || !this._config) return;
      this._hass.callService("light", "toggle", { entity_id: this._config.entity });
    };
    root.getElementById("toggleBtn")!.addEventListener("click", toggleFn);
    root.getElementById("infoArea")!.addEventListener("click", toggleFn);
    root.getElementById("infoArea")!.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this._openMoreInfo();
    });

    const briSlider = root.getElementById("briSlider") as HTMLInputElement;
    const briVal = root.getElementById("briVal")!;
    briSlider.addEventListener("pointerdown", () => {
      this._draggingBri = true;
    });
    briSlider.addEventListener("input", () => {
      const pct = Number(briSlider.value);
      briSlider.style.setProperty("--bri-pct", `${pct}%`);
      briVal.textContent = `${pct}%`;
    });
    briSlider.addEventListener("change", () => {
      this._draggingBri = false;
      if (!this._hass || !this._config) return;
      const st = this._hass.states[this._config.entity];
      if (st && st.state !== "on" && this._config.drag_to_turn_on === false) {
        this._update();
        return;
      }
      const pct = Number(briSlider.value);
      this._hass.callService("light", "turn_on", {
        entity_id: this._config.entity,
        brightness_pct: pct,
      });
    });

    const tempSlider = root.getElementById("tempSlider") as HTMLInputElement;
    const tempVal = root.getElementById("tempVal")!;
    tempSlider.addEventListener("pointerdown", () => {
      this._draggingTemp = true;
    });
    tempSlider.addEventListener("input", () => {
      const k = Number(tempSlider.value);
      tempVal.textContent = `${this._kelvinWord(k, this._lang())} ${k}K`;
    });
    tempSlider.addEventListener("change", () => {
      this._draggingTemp = false;
      if (!this._hass || !this._config) return;
      const st = this._hass.states[this._config.entity];
      if (st && st.state !== "on" && this._config.drag_to_turn_on === false) {
        this._update();
        return;
      }
      const k = Number(tempSlider.value);
      const attrs = st?.attributes || {};
      if (attrs.min_color_temp_kelvin != null || attrs.color_temp_kelvin != null || attrs.min_mireds == null) {
        this._hass.callService("light", "turn_on", {
          entity_id: this._config.entity,
          color_temp_kelvin: k,
        });
      } else {
        this._hass.callService("light", "turn_on", {
          entity_id: this._config.entity,
          color_temp: Math.round(1000000 / k),
        });
      }
    });
  }

  private _openMoreInfo(): void {
    if (!this._config) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._config.entity },
      })
    );
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
    const slidersGrid = root.getElementById("slidersGrid")!;
    const briCol = root.getElementById("briCol")!;
    const tempCol = root.getElementById("tempCol")!;
    const briLbl = root.getElementById("briLbl")!;
    const tempLbl = root.getElementById("tempLbl")!;
    const briSlider = root.getElementById("briSlider") as HTMLInputElement;
    const briVal = root.getElementById("briVal")!;
    const tempSlider = root.getElementById("tempSlider") as HTMLInputElement;
    const tempVal = root.getElementById("tempVal")!;

    briLbl.textContent = t(lang, "bri_label");
    tempLbl.textContent = t(lang, "temp_label");

    if (!st) {
      nameEl.textContent = this._config.name || this._config.entity;
      subEl.textContent = t(lang, "missing_entity");
      slidersGrid.classList.add("hidden");
      return;
    }

    const attrs = st.attributes || {};
    iconEl.setAttribute("icon", this._config.icon || attrs.icon || "mdi:ceiling-light");
    nameEl.textContent = this._config.name || attrs.friendly_name || this._config.entity;

    if (st.state === "unavailable") {
      subEl.textContent = t(lang, "unavailable");
      iconWrap.classList.remove("on");
      swTrack.classList.remove("on");
      slidersGrid.classList.add("off-dim");
      return;
    }

    const isOn = st.state === "on";
    const modes: string[] = Array.isArray(attrs.supported_color_modes)
      ? attrs.supported_color_modes
      : [];

    const supportsBri =
      modes.length === 0
        ? attrs.brightness != null
        : modes.some((m) => m !== "onoff");
    const showBri =
      this._config.show_brightness !== undefined
        ? Boolean(this._config.show_brightness)
        : supportsBri;

    const explicitTempCfg =
      this._config.show_color_temp !== undefined
        ? this._config.show_color_temp
        : this._config.has_color_temp;
    const showTemp =
      explicitTempCfg !== undefined
        ? Boolean(explicitTempCfg)
        : modes.includes("color_temp");

    briCol.classList.toggle("hidden", !showBri);
    tempCol.classList.toggle("hidden", !showTemp);
    const visibleCount = (showBri ? 1 : 0) + (showTemp ? 1 : 0);
    slidersGrid.classList.toggle("hidden", visibleCount === 0);
    slidersGrid.classList.toggle("single", visibleCount === 1);
    slidersGrid.classList.toggle("off-dim", !isOn);

    iconWrap.classList.toggle("on", isOn);
    swTrack.classList.toggle("on", isOn);

    const briPct =
      attrs.brightness != null
        ? Math.max(1, Math.round((Number(attrs.brightness) / 255) * 100))
        : isOn
          ? 100
          : 0;

    const minK = Number(
      attrs.min_color_temp_kelvin ||
        (attrs.max_mireds ? Math.round(1000000 / Number(attrs.max_mireds)) : 2700)
    );
    const maxK = Number(
      attrs.max_color_temp_kelvin ||
        (attrs.min_mireds ? Math.round(1000000 / Number(attrs.min_mireds)) : 6500)
    );
    const curK = Number(
      attrs.color_temp_kelvin ||
        (attrs.color_temp ? Math.round(1000000 / Number(attrs.color_temp)) : Math.round((minK + maxK) / 2))
    );

    tempSlider.min = String(minK);
    tempSlider.max = String(maxK);

    if (showBri && !this._draggingBri) {
      const sliderVal = isOn ? briPct : 50;
      briSlider.value = String(sliderVal);
      briSlider.style.setProperty("--bri-pct", `${isOn ? briPct : 0}%`);
      briVal.textContent = isOn ? `${briPct}%` : t(lang, "light_off_val");
    }

    const kWord = this._kelvinWord(curK, lang);
    if (showTemp && !this._draggingTemp) {
      tempSlider.value = String(Math.min(maxK, Math.max(minK, curK)));
      tempVal.textContent = `${kWord} ${curK}K`;
    }

    if (!isOn) {
      subEl.textContent = visibleCount > 0 ? t(lang, "light_off_hint") : t(lang, "off");
    } else if (showBri && showTemp) {
      subEl.textContent = `${t(lang, "on")} · ${briPct}% · ${kWord}`;
    } else if (showBri) {
      subEl.textContent = `${t(lang, "on")} · ${briPct}%`;
    } else {
      subEl.textContent = t(lang, "on");
    }
  }
}
