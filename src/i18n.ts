import type { HomeAssistant } from "./types";

export type LangCode = "zh" | "en";

const DICT = {
  zh: {
    unavailable: "设备不可用",
    missing_entity: "未找到实体",
    on: "开启",
    off: "已关闭",
    bri_label: "亮度",
    temp_label: "色温",
    warm: "暖光",
    neutral: "自然",
    cool: "冷白",
    light_off_hint: "已关闭 · 拖滑块直开",
    light_off_val: "关闭",
    fan_gear: "{n}档",
    fan_current_gear: "开启 · 当前 {n}档",
    fan_current_pct: "开启 · {pct}%",
    fan_off_hint: "已关闭 · 点档位直开",
    ac_room: "室温 {t}°",
    ac_mode_off: "关闭",
    ac_mode_cool: "制冷",
    ac_mode_heat: "制热",
    ac_mode_heat_cool: "自动",
    ac_mode_auto: "自动",
    ac_mode_dry: "除湿",
    ac_mode_fan_only: "送风",
    ac_state_off: "已关",
    safe_locked_badge: "🔒 已锁死",
    safe_confirm_badge: "🛡️ 需确认",
    safe_tap_again_badge: "⚠️ 再点断电",
    safe_turn_on_badge: "⚡ 点此开机",
    safe_blocked_hint: "⚠️ 已拦截断电操作",
    safe_lock_hint: "仅允许开机，禁断电",
    safe_confirm_hint: "连点两次才可断电",
    safe_confirm_armed_hint: "再次点击将立即断电",
    safe_off_hint: "点击右侧按钮恢复供电",
    safe_seg_lock: "锁死",
    safe_seg_confirm: "二次确认",
    ed_entity: "选择实体",
    ed_name: "显示名称（留空使用默认名称）",
    ed_icon: "自定义图标（可选）",
    ed_show_bri: "显示亮度滑块",
    ed_show_temp: "显示色温滑块（自动检测或强制开关）",
    ed_drag_on: "关灯时拖动滑块直接开灯",
    ed_gears: "档位数量（留空按设备步进自动计算）",
    ed_step: "温度调节步进（默认 0.5°C）",
    ed_protection: "防误关策略",
    ed_prot_lock: "锁死关闭（仅允许开机，彻底禁止断电）",
    ed_prot_confirm: "二次确认（需连续点击两次才断电）",
    ed_power_entity: "功率传感器实体（可选，用于在副标题显示瓦数）",
    ed_show_mode_switch: "在卡片底部显示「锁死/二次确认」切换按钮",
    ed_compact: "单行紧凑模式（隐藏底部提示栏）",
    card_light_name: "直观灯光卡 (Lucid Light)",
    card_light_desc: "右上角独立开关 + 带文字标注的亮度与色温并排滑块",
    card_fan_name: "直观风扇/新风卡 (Lucid Fan)",
    card_fan_desc: "右上角独立开关 + 自动生成的档位直选按钮",
    card_climate_name: "直观空调温控卡 (Lucid Climate)",
    card_climate_desc: "紧凑加减调温 + 直观中文模式切换按钮",
    card_safe_name: "直观防误关插座卡 (Lucid Safe Switch)",
    card_safe_desc: "支持仅允许开机锁死或二次确认断电的保护插座卡片",
  },
  en: {
    unavailable: "Unavailable",
    missing_entity: "Entity not found",
    on: "On",
    off: "Off",
    bri_label: "Brightness",
    temp_label: "Temp",
    warm: "Warm",
    neutral: "Day",
    cool: "Cool",
    light_off_hint: "Off · Drag slider to turn on",
    light_off_val: "Off",
    fan_gear: "S{n}",
    fan_current_gear: "On · Speed {n}",
    fan_current_pct: "On · {pct}%",
    fan_off_hint: "Off · Tap speed to start",
    ac_room: "Room {t}°",
    ac_mode_off: "Off",
    ac_mode_cool: "Cool",
    ac_mode_heat: "Heat",
    ac_mode_heat_cool: "Auto",
    ac_mode_auto: "Auto",
    ac_mode_dry: "Dry",
    ac_mode_fan_only: "Fan",
    ac_state_off: "Off",
    safe_locked_badge: "🔒 Locked",
    safe_confirm_badge: "🛡️ Protected",
    safe_tap_again_badge: "⚠️ Tap Again",
    safe_turn_on_badge: "⚡ Turn On",
    safe_blocked_hint: "⚠️ Turn-off blocked",
    safe_lock_hint: "On-only, turn-off disabled",
    safe_confirm_hint: "Double-tap to turn off",
    safe_confirm_armed_hint: "Tap again to cut power",
    safe_off_hint: "Tap button to restore power",
    safe_seg_lock: "Lock",
    safe_seg_confirm: "2-Tap",
    ed_entity: "Entity",
    ed_name: "Display Name (optional)",
    ed_icon: "Custom Icon (optional)",
    ed_show_bri: "Show brightness slider",
    ed_show_temp: "Show color temperature slider",
    ed_drag_on: "Drag slider while off to turn on",
    ed_gears: "Speed gear count (optional, auto-detected by default)",
    ed_step: "Temperature step (default 0.5°)",
    ed_protection: "Protection Mode",
    ed_prot_lock: "Lock Off (Turn-on only, block turning off)",
    ed_prot_confirm: "Double-Tap Confirm before turning off",
    ed_power_entity: "Power Sensor Entity (optional, shows wattage)",
    ed_show_mode_switch: "Show Lock / 2-Tap mode switcher on card",
    ed_compact: "Single-row compact mode (hide bottom hint bar)",
    card_light_name: "Lucid Light Card",
    card_light_desc: "Explicit toggle switch + side-by-side labeled brightness & color temp sliders",
    card_fan_name: "Lucid Fan Card",
    card_fan_desc: "Explicit toggle switch + direct speed gear buttons",
    card_climate_name: "Lucid Climate Card",
    card_climate_desc: "Compact temperature stepper + clear HVAC mode buttons",
    card_safe_name: "Lucid Safe Switch Card",
    card_safe_desc: "Outlet protection card with Turn-On-Only lock or double-tap confirmation",
  },
} as const;

export type DictKey = keyof typeof DICT.zh;

export function resolveLang(
  hass?: HomeAssistant | null,
  override?: "auto" | "zh" | "en"
): LangCode {
  if (override === "zh" || override === "en") return override;
  const raw =
    hass?.language ||
    hass?.locale?.language ||
    (typeof navigator !== "undefined" ? navigator.language : "zh");
  return String(raw).toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function t(
  lang: LangCode,
  key: DictKey,
  vars?: Record<string, string | number>
): string {
  let str: string = DICT[lang][key] ?? DICT.zh[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}
