import { resolveLang, t, type LangCode } from "../i18n";
import { BASE_CARD_STYLES } from "../styles";
import type {
  HomeAssistant,
  LucidSafeSwitchCardConfig,
  SafeProtectionMode,
} from "../types";

const SAFE_SWITCH_STYLES = `
  ${BASE_CARD_STYLES}
  ha-card {
    container-type: inline-size;
  }
  .icon-wrap.on {
    background: rgba(245, 158, 11, 0.16);
    color: #f59e0b;
  }
  .icon-wrap.on.confirm-tone {
    background: rgba(14, 165, 233, 0.15);
    color: #0284c7;
  }
  .action-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.24));
    background: rgba(127, 127, 127, 0.1);
    color: var(--primary-text-color);
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 11.5px;
    font-weight: 500;
    line-height: 1.2;
    white-space: nowrap;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.15s ease;
  }
  .action-pill ha-icon {
    --mdc-icon-size: 14px;
    display: inline-flex;
  }
  .action-pill.lock {
    background: rgba(245, 158, 11, 0.12);
    border-color: rgba(245, 158, 11, 0.28);
    color: #d97706;
  }
  .action-pill.confirm {
    background: rgba(14, 165, 233, 0.12);
    border-color: rgba(14, 165, 233, 0.28);
    color: #0284c7;
  }
  .action-pill.turn-on {
    background: rgba(16, 185, 129, 0.14);
    border-color: rgba(16, 185, 129, 0.36);
    color: #059669;
  }
  .action-pill.armed {
    background: rgba(239, 68, 68, 0.14);
    border-color: rgba(239, 68, 68, 0.4);
    color: #ef4444;
  }
  .action-pill.icon-only {
    width: 26px;
    height: 26px;
    padding: 0;
    border-color: transparent;
  }
  .action-pill.icon-only .pill-txt {
    display: none;
  }
  @container (max-width: 230px) {
    .action-pill {
      width: 26px;
      height: 26px;
      padding: 0;
      border-color: transparent;
    }
    .action-pill .pill-txt {
      display: none;
    }
  }
  .footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 11px;
    line-height: 1.2;
  }
  .footer-row.hidden {
    display: none;
  }
  .hint-txt {
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    flex: 1;
  }
  .hint-txt.warn {
    color: #d97706;
    font-weight: 500;
  }
  .seg-group {
    display: inline-flex;
    align-items: center;
    border-radius: 6px;
    background: rgba(127, 127, 127, 0.12);
    padding: 2px;
    flex-shrink: 0;
  }
  .seg-group.hidden {
    display: none;
  }
  .seg-btn {
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--secondary-text-color);
    padding: 2px 8px;
    font-size: 11px;
    line-height: 1.25;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .seg-btn.active {
    background: var(--ha-card-background, #ffffff);
    color: var(--primary-text-color);
    font-weight: 500;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  }
`;

export class LucidSafeSwitchCard extends HTMLElement {
  private _config: LucidSafeSwitchCardConfig | null = null;
  private _hass: HomeAssistant | null = null;
  private _rendered = false;
  private _mode: SafeProtectionMode = "lock";
  private _confirmArmed = false;
  private _blockedFlash = false;
  private _timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("lucid-safe-switch-card-editor");
  }

  static getStubConfig(hass?: HomeAssistant): LucidSafeSwitchCardConfig {
    const firstSwitch = hass
      ? Object.keys(hass.states).find((id) => id.startsWith("switch."))
      : undefined;
    return {
      type: "custom:lucid-safe-switch-card",
      entity: firstSwitch || "switch.example",
      protection: "lock",
      show_mode_switch: true,
    };
  }

  setConfig(config: LucidSafeSwitchCardConfig): void {
    if (!config || !config.entity) {
      throw new Error("Entity is required for lucid-safe-switch-card");
    }
    this._config = config;
    this._mode = config.protection === "confirm" ? "confirm" : "lock";
    this._clearTimers();
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

  private _clearTimers(): void {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    this._confirmArmed = false;
    this._blockedFlash = false;
  }

  private _domain(): string {
    const ent = this._config?.entity || "switch.unknown";
    const domain = ent.split(".")[0];
    return ["switch", "input_boolean", "light", "fan"].includes(domain)
      ? domain
      : "homeassistant";
  }

  private _ensureDom(): void {
    if (this._rendered || !this.shadowRoot) return;
    this._rendered = true;
    this.shadowRoot.innerHTML = `
      <style>${SAFE_SWITCH_STYLES}</style>
      <ha-card>
        <div class="top-row">
          <div class="left-info" id="infoArea">
            <div class="icon-wrap" id="iconWrap">
              <ha-icon id="iconEl" icon="mdi:power-socket-ch"></ha-icon>
            </div>
            <div class="titles">
              <div class="name" id="nameEl"></div>
              <div class="sub" id="subEl"></div>
            </div>
          </div>
          <button class="action-pill" id="actionBtn" type="button">
            <ha-icon id="pillIcon" icon="mdi:shield-lock-outline"></ha-icon>
            <span class="pill-txt" id="pillTxt"></span>
          </button>
        </div>
        <div class="footer-row bottom-sep" id="footerRow">
          <span class="hint-txt" id="hintTxt"></span>
          <div class="seg-group" id="segGroup">
            <button class="seg-btn" id="segLock" type="button"></button>
            <button class="seg-btn" id="segConfirm" type="button"></button>
          </div>
        </div>
      </ha-card>
    `;

    const root = this.shadowRoot;
    const handleAction = (e: Event) => {
      e.stopPropagation();
      this._onActionClick();
    };
    root.getElementById("actionBtn")!.addEventListener("click", handleAction);
    root.getElementById("infoArea")!.addEventListener("click", handleAction);
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

    root.getElementById("segLock")!.addEventListener("click", (e) => {
      e.stopPropagation();
      this._clearTimers();
      this._mode = "lock";
      this._update();
    });
    root.getElementById("segConfirm")!.addEventListener("click", (e) => {
      e.stopPropagation();
      this._clearTimers();
      this._mode = "confirm";
      this._update();
    });
  }

  private _onActionClick(): void {
    if (!this._hass || !this._config) return;
    const st = this._hass.states[this._config.entity];
    if (!st || st.state === "unavailable") return;

    const isOn = st.state === "on";
    if (!isOn) {
      this._clearTimers();
      this._hass.callService(this._domain(), "turn_on", {
        entity_id: this._config.entity,
      });
      return;
    }

    if (this._mode === "lock") {
      this._clearTimers();
      this._blockedFlash = true;
      this._update();
      this._timer = setTimeout(() => {
        this._blockedFlash = false;
        this._update();
      }, 2400);
      return;
    }

    if (!this._confirmArmed) {
      this._clearTimers();
      this._confirmArmed = true;
      this._update();
      this._timer = setTimeout(() => {
        this._confirmArmed = false;
        this._update();
      }, 3500);
      return;
    }

    this._clearTimers();
    this._hass.callService(this._domain(), "turn_off", {
      entity_id: this._config.entity,
    });
    this._update();
  }

  private _readPowerText(): string | null {
    if (!this._hass || !this._config) return null;
    if (this._config.power_entity) {
      const pSt = this._hass.states[this._config.power_entity];
      if (pSt && pSt.state !== "unavailable" && pSt.state !== "unknown") {
        const unit = pSt.attributes?.unit_of_measurement || "W";
        const num = Number(pSt.state);
        if (!Number.isNaN(num)) {
          const formatted = num >= 10 ? Math.round(num) : Math.round(num * 10) / 10;
          return `${formatted}${unit}`;
        }
        return `${pSt.state}${unit}`;
      }
    }
    const st = this._hass.states[this._config.entity];
    const attrs = st?.attributes || {};
    const rawW = attrs.current_power_w ?? attrs.power ?? attrs.load_power;
    if (rawW != null && !Number.isNaN(Number(rawW))) {
      const num = Number(rawW);
      const formatted = num >= 10 ? Math.round(num) : Math.round(num * 10) / 10;
      return `${formatted}W`;
    }
    return null;
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
    const actionBtn = root.getElementById("actionBtn")!;
    const pillIcon = root.getElementById("pillIcon")!;
    const pillTxt = root.getElementById("pillTxt")!;
    const footerRow = root.getElementById("footerRow")!;
    const hintTxt = root.getElementById("hintTxt")!;
    const segGroup = root.getElementById("segGroup")!;
    const segLock = root.getElementById("segLock")!;
    const segConfirm = root.getElementById("segConfirm")!;

    const isCompact = Boolean(this._config.compact);
    const compactCls = isCompact ? " icon-only" : "";
    footerRow.classList.toggle("hidden", isCompact);
    segGroup.classList.toggle("hidden", this._config.show_mode_switch === false);
    segLock.textContent = t(lang, "safe_seg_lock");
    segConfirm.textContent = t(lang, "safe_seg_confirm");
    segLock.classList.toggle("active", this._mode === "lock");
    segConfirm.classList.toggle("active", this._mode === "confirm");

    if (!st) {
      nameEl.textContent = this._config.name || this._config.entity;
      subEl.textContent = t(lang, "missing_entity");
      pillTxt.textContent = "--";
      return;
    }

    const attrs = st.attributes || {};
    iconEl.setAttribute(
      "icon",
      this._config.icon || attrs.icon || "mdi:desktop-tower-monitor"
    );
    nameEl.textContent = this._config.name || attrs.friendly_name || this._config.entity;

    if (st.state === "unavailable") {
      subEl.textContent = t(lang, "unavailable");
      iconWrap.classList.remove("on", "confirm-tone");
      actionBtn.className = `action-pill${compactCls}`;
      pillIcon.setAttribute("icon", "mdi:alert-circle-outline");
      pillTxt.textContent = "--";
      return;
    }

    const isOn = st.state === "on";
    iconWrap.classList.toggle("on", isOn);
    iconWrap.classList.toggle("confirm-tone", isOn && this._mode === "confirm");
    const powerTxt = this._readPowerText();

    subEl.classList.remove("warn");
    hintTxt.classList.remove("warn");

    if (!isOn) {
      subEl.textContent = powerTxt ? `${t(lang, "off")} · ${powerTxt}` : t(lang, "off");
      actionBtn.className = `action-pill turn-on${compactCls}`;
      pillIcon.setAttribute("icon", "mdi:power");
      pillTxt.textContent = t(lang, "safe_turn_on_badge");
      hintTxt.textContent = t(lang, "safe_off_hint");
      return;
    }

    const modeBadgeTxt =
      this._mode === "lock" ? t(lang, "safe_seg_lock") : t(lang, "safe_seg_confirm");
    const normalSub = isCompact
      ? powerTxt
        ? `${powerTxt} · ${modeBadgeTxt}`
        : `${t(lang, "safe_powering")} · ${modeBadgeTxt}`
      : powerTxt
        ? `${t(lang, "safe_powering")} · ${powerTxt}`
        : t(lang, "safe_powering");

    if (this._mode === "lock") {
      actionBtn.className = `action-pill lock${compactCls}`;
      pillIcon.setAttribute("icon", "mdi:shield-lock-outline");
      pillTxt.textContent = t(lang, "safe_locked_badge");
      if (this._blockedFlash) {
        hintTxt.textContent = t(lang, "safe_blocked_hint");
        hintTxt.classList.add("warn");
        if (isCompact) {
          subEl.textContent = t(lang, "safe_blocked_short");
          subEl.classList.add("warn");
        } else {
          subEl.textContent = normalSub;
        }
      } else {
        subEl.textContent = normalSub;
        hintTxt.textContent = t(lang, "safe_lock_hint");
      }
    } else if (this._confirmArmed) {
      actionBtn.className = `action-pill armed${compactCls}`;
      pillIcon.setAttribute("icon", "mdi:alert-circle-outline");
      pillTxt.textContent = t(lang, "safe_tap_again_badge");
      hintTxt.textContent = t(lang, "safe_confirm_armed_hint");
      hintTxt.classList.add("warn");
      subEl.textContent = isCompact ? t(lang, "safe_confirm_armed_short") : normalSub;
      if (isCompact) subEl.classList.add("warn");
    } else {
      actionBtn.className = `action-pill confirm${compactCls}`;
      pillIcon.setAttribute("icon", "mdi:shield-check-outline");
      pillTxt.textContent = t(lang, "safe_confirm_badge");
      subEl.textContent = normalSub;
      hintTxt.textContent = t(lang, "safe_confirm_hint");
    }
  }
}
