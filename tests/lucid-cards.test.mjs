import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { Window } from "happy-dom";

let win;

before(async () => {
  win = new Window({ url: "http://localhost:8123/" });
  for (const key of [
    "window",
    "document",
    "HTMLElement",
    "CustomEvent",
    "Event",
    "customElements",
    "navigator",
  ]) {
    Object.defineProperty(globalThis, key, {
      value: win[key],
      configurable: true,
      writable: true,
    });
  }
  await import("../dist/lucid-cards.js");
});

function createMockHass(states = {}, language = "zh-Hans") {
  const calls = [];
  return {
    calls,
    hass: {
      language,
      states,
      callService(domain, service, data) {
        calls.push({ domain, service, data });
      },
    },
  };
}

describe("Lucid Cards bundle registration", () => {
  it("registers all 4 custom cards and 4 visual editors", () => {
    for (const tag of [
      "lucid-light-card",
      "lucid-fan-card",
      "lucid-climate-card",
      "lucid-safe-switch-card",
      "lucid-light-card-editor",
      "lucid-fan-card-editor",
      "lucid-climate-card-editor",
      "lucid-safe-switch-card-editor",
    ]) {
      assert.ok(customElements.get(tag), `Expected ${tag} to be defined`);
    }
    assert.equal(window.customCards.length, 4);
  });
});

describe("LucidLightCard", () => {
  it("renders Chinese labels, brightness %, color temp, and toggles/dims cleanly", () => {
    const { hass, calls } = createMockHass({
      "light.living": {
        entity_id: "light.living",
        state: "on",
        attributes: {
          friendly_name: "客厅吸顶灯",
          brightness: 217,
          color_temp_kelvin: 4500,
          min_color_temp_kelvin: 3000,
          max_color_temp_kelvin: 6500,
          supported_color_modes: ["color_temp"],
        },
      },
    });

    const card = document.createElement("lucid-light-card");
    document.body.appendChild(card);
    card.setConfig({ type: "custom:lucid-light-card", entity: "light.living" });
    card.hass = hass;

    const sr = card.shadowRoot;
    assert.equal(sr.getElementById("nameEl").textContent, "客厅吸顶灯");
    assert.equal(sr.getElementById("briLbl").textContent, "亮度");
    assert.equal(sr.getElementById("tempLbl").textContent, "色温");
    assert.equal(sr.getElementById("briVal").textContent, "85%");
    assert.equal(sr.getElementById("tempVal").textContent, "自然 4500K");

    sr.getElementById("toggleBtn").click();
    assert.equal(calls.length, 1);
    assert.deepEqual(calls[0], {
      domain: "light",
      service: "toggle",
      data: { entity_id: "light.living" },
    });

    const briSlider = sr.getElementById("briSlider");
    briSlider.value = "60";
    briSlider.dispatchEvent(new Event("input"));
    briSlider.dispatchEvent(new Event("change"));
    assert.deepEqual(calls[1], {
      domain: "light",
      service: "turn_on",
      data: { entity_id: "light.living", brightness_pct: 60 },
    });
  });

  it("switches to English automatically when hass.language is en", () => {
    const { hass } = createMockHass(
      {
        "light.study": {
          entity_id: "light.study",
          state: "off",
          attributes: {
            friendly_name: "Study Light",
            supported_color_modes: ["brightness"],
          },
        },
      },
      "en"
    );
    const card = document.createElement("lucid-light-card");
    card.setConfig({ type: "custom:lucid-light-card", entity: "light.study" });
    card.hass = hass;

    const sr = card.shadowRoot;
    assert.equal(sr.getElementById("briLbl").textContent, "Brightness");
    assert.equal(sr.getElementById("subEl").textContent, "Off · Drag slider to turn on");
    assert.ok(sr.getElementById("slidersGrid").classList.contains("single"));
  });
});

describe("LucidFanCard", () => {
  it("caps 1%-step stepless DC fans to 5 clean speed buttons and calls set_percentage", () => {
    const { hass, calls } = createMockHass({
      "fan.stand": {
        entity_id: "fan.stand",
        state: "on",
        attributes: {
          friendly_name: "主卧落地扇",
          percentage: 60,
          percentage_step: 1,
        },
      },
    });

    const card = document.createElement("lucid-fan-card");
    card.setConfig({ type: "custom:lucid-fan-card", entity: "fan.stand" });
    card.hass = hass;

    const btns = card.shadowRoot.querySelectorAll(".gear-btn");
    assert.equal(btns.length, 5);
    assert.equal(btns[2].textContent, "3档");
    assert.ok(btns[2].classList.contains("active"));

    btns[4].click();
    assert.deepEqual(calls[0], {
      domain: "fan",
      service: "set_percentage",
      data: { entity_id: "fan.stand", percentage: 100 },
    });
  });
});

describe("LucidClimateCard", () => {
  it("steps target temperature and switches HVAC modes", () => {
    const { hass, calls } = createMockHass({
      "climate.study": {
        entity_id: "climate.study",
        state: "cool",
        attributes: {
          friendly_name: "书房空调",
          temperature: 25,
          current_temperature: 21.5,
          min_temp: 16,
          max_temp: 30,
          target_temp_step: 0.5,
          hvac_modes: ["off", "cool", "heat", "dry", "fan_only"],
        },
      },
    });

    const card = document.createElement("lucid-climate-card");
    card.setConfig({ type: "custom:lucid-climate-card", entity: "climate.study" });
    card.hass = hass;

    const sr = card.shadowRoot;
    assert.equal(sr.getElementById("subEl").textContent, "制冷 · 室温 21.5°");
    sr.getElementById("minusBtn").click();
    assert.deepEqual(calls[0], {
      domain: "climate",
      service: "set_temperature",
      data: { entity_id: "climate.study", temperature: 24.5 },
    });

    const heatBtn = [...sr.querySelectorAll(".mode-btn")].find(
      (b) => b.dataset.mode === "heat"
    );
    heatBtn.click();
    assert.deepEqual(calls[1], {
      domain: "climate",
      service: "set_hvac_mode",
      data: { entity_id: "climate.study", hvac_mode: "heat" },
    });
  });
});

describe("LucidSafeSwitchCard", () => {
  it("blocks turn_off in lock mode, allows turn_on when off, and requires 2 taps in confirm mode", () => {
    const { hass, calls } = createMockHass({
      "switch.pc": {
        entity_id: "switch.pc",
        state: "on",
        attributes: {
          friendly_name: "电脑主机插座",
          power: 265,
        },
      },
    });

    const card = document.createElement("lucid-safe-switch-card");
    card.setConfig({
      type: "custom:lucid-safe-switch-card",
      entity: "switch.pc",
      protection: "lock",
    });
    card.hass = hass;

    const sr = card.shadowRoot;
    assert.equal(sr.getElementById("subEl").textContent, "开启 · 265W");

    // Lock mode blocks turning off
    sr.getElementById("actionBtn").click();
    assert.equal(calls.length, 0);
    assert.equal(sr.getElementById("hintTxt").textContent, "⚠️ 已拦截断电操作");

    // Switch to confirm mode: 1st tap arms, 2nd tap turns off
    sr.getElementById("segConfirm").click();
    sr.getElementById("actionBtn").click();
    assert.equal(calls.length, 0);
    assert.equal(sr.getElementById("actionBtn").textContent, "⚠️ 再点断电");

    sr.getElementById("actionBtn").click();
    assert.equal(calls.length, 1);
    assert.deepEqual(calls[0], {
      domain: "switch",
      service: "turn_off",
      data: { entity_id: "switch.pc" },
    });

    // When off, single tap turns back on even in lock mode
    hass.states["switch.pc"].state = "off";
    card.setConfig({
      type: "custom:lucid-safe-switch-card",
      entity: "switch.pc",
      protection: "lock",
    });
    card.hass = hass;
    sr.getElementById("actionBtn").click();
    assert.deepEqual(calls[1], {
      domain: "switch",
      service: "turn_on",
      data: { entity_id: "switch.pc" },
    });
  });
});
