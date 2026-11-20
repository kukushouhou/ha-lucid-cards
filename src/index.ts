import { LucidClimateCard } from "./cards/climate-card";
import { LucidFanCard } from "./cards/fan-card";
import { LucidLightCard } from "./cards/light-card";
import { LucidSafeSwitchCard } from "./cards/safe-switch-card";
import {
  LucidClimateCardEditor,
  LucidFanCardEditor,
  LucidLightCardEditor,
  LucidSafeSwitchCardEditor,
} from "./editors";
import { resolveLang, t } from "./i18n";

declare const __LUCID_VERSION__: string | undefined;

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

function safeDefine(name: string, ctor: CustomElementConstructor): void {
  if (!customElements.get(name)) {
    customElements.define(name, ctor);
  }
}

safeDefine("lucid-light-card", LucidLightCard);
safeDefine("lucid-fan-card", LucidFanCard);
safeDefine("lucid-climate-card", LucidClimateCard);
safeDefine("lucid-safe-switch-card", LucidSafeSwitchCard);

safeDefine("lucid-light-card-editor", LucidLightCardEditor);
safeDefine("lucid-fan-card-editor", LucidFanCardEditor);
safeDefine("lucid-climate-card-editor", LucidClimateCardEditor);
safeDefine("lucid-safe-switch-card-editor", LucidSafeSwitchCardEditor);

const DOC_URL = "https://github.com/kukushouhou/ha-lucid-cards";
const navLang = resolveLang(null);

window.customCards = window.customCards || [];
const CARD_METAS = [
  {
    type: "lucid-light-card",
    name: t(navLang, "card_light_name"),
    description: t(navLang, "card_light_desc"),
    preview: true,
    documentationURL: DOC_URL,
  },
  {
    type: "lucid-fan-card",
    name: t(navLang, "card_fan_name"),
    description: t(navLang, "card_fan_desc"),
    preview: true,
    documentationURL: DOC_URL,
  },
  {
    type: "lucid-climate-card",
    name: t(navLang, "card_climate_name"),
    description: t(navLang, "card_climate_desc"),
    preview: true,
    documentationURL: DOC_URL,
  },
  {
    type: "lucid-safe-switch-card",
    name: t(navLang, "card_safe_name"),
    description: t(navLang, "card_safe_desc"),
    preview: true,
    documentationURL: DOC_URL,
  },
];

for (const meta of CARD_METAS) {
  if (!window.customCards.some((c) => c.type === meta.type)) {
    window.customCards.push(meta);
  }
}

const version = typeof __LUCID_VERSION__ !== "undefined" ? __LUCID_VERSION__ : "0.1.0";
console.info(
  `%c LUCID-CARDS %c v${version} `,
  "background:#f59e0b;color:#111827;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px;",
  "background:#1f2937;color:#f9fafb;font-weight:600;padding:2px 6px;border-radius:0 4px 4px 0;"
);

export {
  LucidLightCard,
  LucidFanCard,
  LucidClimateCard,
  LucidSafeSwitchCard,
  LucidLightCardEditor,
  LucidFanCardEditor,
  LucidClimateCardEditor,
  LucidSafeSwitchCardEditor,
};
