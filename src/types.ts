export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity | undefined>;
  language?: string;
  locale?: { language?: string };
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>
  ) => Promise<void> | void;
}

export interface GridOptions {
  columns?: number | "full";
  min_columns?: number;
  rows?: number | "auto";
}

export interface BaseLucidCardConfig {
  type: string;
  entity: string;
  name?: string;
  icon?: string;
  compact?: boolean;
  language?: "auto" | "zh" | "en";
  grid_options?: GridOptions;
}

export interface LucidLightCardConfig extends BaseLucidCardConfig {
  show_brightness?: boolean;
  show_color_temp?: boolean;
  /** Backward-compatible alias */
  has_color_temp?: boolean;
  drag_to_turn_on?: boolean;
}

export interface LucidFanCardConfig extends BaseLucidCardConfig {
  gears?: number;
}

export interface LucidClimateCardConfig extends BaseLucidCardConfig {
  step?: number;
  modes?: string[];
}

export type SafeProtectionMode = "lock" | "confirm";

export interface LucidSafeSwitchCardConfig extends BaseLucidCardConfig {
  protection?: SafeProtectionMode;
  power_entity?: string;
  show_mode_switch?: boolean;
  compact?: boolean;
}
