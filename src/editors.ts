import { resolveLang, t, type DictKey, type LangCode } from "./i18n";
import type { BaseLucidCardConfig, HomeAssistant } from "./types";

interface HaFormSchemaItem {
  name: string;
  labelKey: DictKey;
  required?: boolean;
  selector: Record<string, unknown>;
}

interface HaFormElement extends HTMLElement {
  hass?: HomeAssistant | null;
  data?: Record<string, unknown>;
  schema?: Array<{ name: string; required?: boolean; selector: Record<string, unknown> }>;
  computeLabel?: (schema: { name: string }) => string;
}

abstract class BaseLucidEditor extends HTMLElement {
  protected _config: Record<string, any> = {};
  protected _hass: HomeAssistant | null = null;
  private _form: HaFormElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  protected abstract getSchema(lang: LangCode): HaFormSchemaItem[];
  protected abstract getDefaults(): Record<string, unknown>;

  setConfig(config: BaseLucidCardConfig): void {
    this._config = { ...config };
    this._render();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._render();
  }

  private _lang(): LangCode {
    return resolveLang(this._hass, this._config?.language);
  }

  private _render(): void {
    if (!this.shadowRoot) return;
    if (!this._form) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            padding: 4px 0;
          }
        </style>
      `;
      this._form = document.createElement("ha-form") as HaFormElement;
      this._form.addEventListener("value-changed", (ev: Event) => {
        const customEv = ev as CustomEvent<{ value: Record<string, unknown> }>;
        if (!customEv.detail?.value) return;
        const merged: Record<string, unknown> = {
          ...this._config,
          ...customEv.detail.value,
        };
        for (const [k, v] of Object.entries(merged)) {
          if (v === "" || v === undefined) {
            delete merged[k];
          }
        }
        this._config = merged;
        this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: merged },
            bubbles: true,
            composed: true,
          })
        );
      });
      this.shadowRoot.appendChild(this._form);
    }

    const lang = this._lang();
    const items = this.getSchema(lang);
    const labelMap = new Map<string, string>();
    for (const item of items) {
      labelMap.set(item.name, t(lang, item.labelKey));
    }

    this._form.hass = this._hass;
    this._form.data = { ...this.getDefaults(), ...this._config };
    this._form.schema = items.map(({ name, required, selector }) => ({
      name,
      required,
      selector,
    }));
    this._form.computeLabel = (s) => labelMap.get(s.name) || s.name;
  }
}

export class LucidLightCardEditor extends BaseLucidEditor {
  protected getDefaults(): Record<string, unknown> {
    return {
      show_brightness: true,
      drag_to_turn_on: true,
    };
  }

  protected getSchema(): HaFormSchemaItem[] {
    return [
      {
        name: "entity",
        labelKey: "ed_entity",
        required: true,
        selector: { entity: { domain: "light" } },
      },
      {
        name: "name",
        labelKey: "ed_name",
        selector: { text: {} },
      },
      {
        name: "icon",
        labelKey: "ed_icon",
        selector: { icon: {} },
      },
      {
        name: "show_brightness",
        labelKey: "ed_show_bri",
        selector: { boolean: {} },
      },
      {
        name: "show_color_temp",
        labelKey: "ed_show_temp",
        selector: { boolean: {} },
      },
      {
        name: "drag_to_turn_on",
        labelKey: "ed_drag_on",
        selector: { boolean: {} },
      },
    ];
  }
}

export class LucidFanCardEditor extends BaseLucidEditor {
  protected getDefaults(): Record<string, unknown> {
    return {};
  }

  protected getSchema(): HaFormSchemaItem[] {
    return [
      {
        name: "entity",
        labelKey: "ed_entity",
        required: true,
        selector: { entity: { domain: "fan" } },
      },
      {
        name: "name",
        labelKey: "ed_name",
        selector: { text: {} },
      },
      {
        name: "icon",
        labelKey: "ed_icon",
        selector: { icon: {} },
      },
      {
        name: "gears",
        labelKey: "ed_gears",
        selector: { number: { min: 2, max: 8, mode: "box" } },
      },
    ];
  }
}

export class LucidClimateCardEditor extends BaseLucidEditor {
  protected getDefaults(): Record<string, unknown> {
    return {
      step: 0.5,
    };
  }

  protected getSchema(): HaFormSchemaItem[] {
    return [
      {
        name: "entity",
        labelKey: "ed_entity",
        required: true,
        selector: { entity: { domain: "climate" } },
      },
      {
        name: "name",
        labelKey: "ed_name",
        selector: { text: {} },
      },
      {
        name: "icon",
        labelKey: "ed_icon",
        selector: { icon: {} },
      },
      {
        name: "step",
        labelKey: "ed_step",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: 0.5, label: "0.5°" },
              { value: 1, label: "1.0°" },
            ],
          },
        },
      },
    ];
  }
}

export class LucidSafeSwitchCardEditor extends BaseLucidEditor {
  protected getDefaults(): Record<string, unknown> {
    return {
      protection: "lock",
      show_mode_switch: true,
      compact: false,
    };
  }

  protected getSchema(lang: LangCode): HaFormSchemaItem[] {
    return [
      {
        name: "entity",
        labelKey: "ed_entity",
        required: true,
        selector: { entity: { domain: ["switch", "input_boolean", "light"] } },
      },
      {
        name: "name",
        labelKey: "ed_name",
        selector: { text: {} },
      },
      {
        name: "icon",
        labelKey: "ed_icon",
        selector: { icon: {} },
      },
      {
        name: "protection",
        labelKey: "ed_protection",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "lock", label: t(lang, "ed_prot_lock") },
              { value: "confirm", label: t(lang, "ed_prot_confirm") },
            ],
          },
        },
      },
      {
        name: "power_entity",
        labelKey: "ed_power_entity",
        selector: { entity: { domain: "sensor" } },
      },
      {
        name: "show_mode_switch",
        labelKey: "ed_show_mode_switch",
        selector: { boolean: {} },
      },
      {
        name: "compact",
        labelKey: "ed_compact",
        selector: { boolean: {} },
      },
    ];
  }
}
