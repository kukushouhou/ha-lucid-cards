/* Lucid Cards (直观卡片) v0.1.0 | MIT License | https://github.com/kukushouhou/ha-lucid-cards */
var U={zh:{unavailable:"\u8BBE\u5907\u4E0D\u53EF\u7528",missing_entity:"\u672A\u627E\u5230\u5B9E\u4F53",on:"\u5F00\u542F",off:"\u5DF2\u5173\u95ED",bri_label:"\u4EAE\u5EA6",temp_label:"\u8272\u6E29",warm:"\u6696\u5149",neutral:"\u81EA\u7136",cool:"\u51B7\u767D",light_off_hint:"\u5DF2\u5173\u95ED \xB7 \u62D6\u6ED1\u5757\u76F4\u5F00",light_off_val:"\u5173\u95ED",fan_gear:"{n}\u6863",fan_current_gear:"\u5F00\u542F \xB7 \u5F53\u524D {n}\u6863",fan_current_pct:"\u5F00\u542F \xB7 {pct}%",fan_off_hint:"\u5DF2\u5173\u95ED \xB7 \u70B9\u6863\u4F4D\u76F4\u5F00",ac_room:"\u5BA4\u6E29 {t}\xB0",ac_mode_off:"\u5173\u95ED",ac_mode_cool:"\u5236\u51B7",ac_mode_heat:"\u5236\u70ED",ac_mode_heat_cool:"\u81EA\u52A8",ac_mode_auto:"\u81EA\u52A8",ac_mode_dry:"\u9664\u6E7F",ac_mode_fan_only:"\u9001\u98CE",ac_state_off:"\u5DF2\u5173",safe_locked_badge:"\u{1F512} \u5DF2\u9501\u6B7B",safe_confirm_badge:"\u{1F6E1}\uFE0F \u9700\u786E\u8BA4",safe_tap_again_badge:"\u26A0\uFE0F \u518D\u70B9\u65AD\u7535",safe_turn_on_badge:"\u26A1 \u70B9\u6B64\u5F00\u673A",safe_blocked_hint:"\u26A0\uFE0F \u5DF2\u62E6\u622A\u65AD\u7535\u64CD\u4F5C",safe_lock_hint:"\u4EC5\u5141\u8BB8\u5F00\u673A\uFF0C\u7981\u65AD\u7535",safe_confirm_hint:"\u8FDE\u70B9\u4E24\u6B21\u624D\u53EF\u65AD\u7535",safe_confirm_armed_hint:"\u518D\u6B21\u70B9\u51FB\u5C06\u7ACB\u5373\u65AD\u7535",safe_off_hint:"\u70B9\u51FB\u53F3\u4FA7\u6309\u94AE\u6062\u590D\u4F9B\u7535",safe_seg_lock:"\u9501\u6B7B",safe_seg_confirm:"\u4E8C\u6B21\u786E\u8BA4",ed_entity:"\u9009\u62E9\u5B9E\u4F53",ed_name:"\u663E\u793A\u540D\u79F0\uFF08\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u540D\u79F0\uFF09",ed_icon:"\u81EA\u5B9A\u4E49\u56FE\u6807\uFF08\u53EF\u9009\uFF09",ed_show_bri:"\u663E\u793A\u4EAE\u5EA6\u6ED1\u5757",ed_show_temp:"\u663E\u793A\u8272\u6E29\u6ED1\u5757\uFF08\u81EA\u52A8\u68C0\u6D4B\u6216\u5F3A\u5236\u5F00\u5173\uFF09",ed_drag_on:"\u5173\u706F\u65F6\u62D6\u52A8\u6ED1\u5757\u76F4\u63A5\u5F00\u706F",ed_gears:"\u6863\u4F4D\u6570\u91CF\uFF08\u7559\u7A7A\u6309\u8BBE\u5907\u6B65\u8FDB\u81EA\u52A8\u8BA1\u7B97\uFF09",ed_step:"\u6E29\u5EA6\u8C03\u8282\u6B65\u8FDB\uFF08\u9ED8\u8BA4 0.5\xB0C\uFF09",ed_protection:"\u9632\u8BEF\u5173\u7B56\u7565",ed_prot_lock:"\u9501\u6B7B\u5173\u95ED\uFF08\u4EC5\u5141\u8BB8\u5F00\u673A\uFF0C\u5F7B\u5E95\u7981\u6B62\u65AD\u7535\uFF09",ed_prot_confirm:"\u4E8C\u6B21\u786E\u8BA4\uFF08\u9700\u8FDE\u7EED\u70B9\u51FB\u4E24\u6B21\u624D\u65AD\u7535\uFF09",ed_power_entity:"\u529F\u7387\u4F20\u611F\u5668\u5B9E\u4F53\uFF08\u53EF\u9009\uFF0C\u7528\u4E8E\u5728\u526F\u6807\u9898\u663E\u793A\u74E6\u6570\uFF09",ed_show_mode_switch:"\u5728\u5361\u7247\u5E95\u90E8\u663E\u793A\u300C\u9501\u6B7B/\u4E8C\u6B21\u786E\u8BA4\u300D\u5207\u6362\u6309\u94AE",ed_compact:"\u5355\u884C\u7D27\u51D1\u6A21\u5F0F\uFF08\u9690\u85CF\u5E95\u90E8\u63D0\u793A\u680F\uFF09",card_light_name:"\u76F4\u89C2\u706F\u5149\u5361 (Lucid Light)",card_light_desc:"\u53F3\u4E0A\u89D2\u72EC\u7ACB\u5F00\u5173 + \u5E26\u6587\u5B57\u6807\u6CE8\u7684\u4EAE\u5EA6\u4E0E\u8272\u6E29\u5E76\u6392\u6ED1\u5757",card_fan_name:"\u76F4\u89C2\u98CE\u6247/\u65B0\u98CE\u5361 (Lucid Fan)",card_fan_desc:"\u53F3\u4E0A\u89D2\u72EC\u7ACB\u5F00\u5173 + \u81EA\u52A8\u751F\u6210\u7684\u6863\u4F4D\u76F4\u9009\u6309\u94AE",card_climate_name:"\u76F4\u89C2\u7A7A\u8C03\u6E29\u63A7\u5361 (Lucid Climate)",card_climate_desc:"\u7D27\u51D1\u52A0\u51CF\u8C03\u6E29 + \u76F4\u89C2\u4E2D\u6587\u6A21\u5F0F\u5207\u6362\u6309\u94AE",card_safe_name:"\u76F4\u89C2\u9632\u8BEF\u5173\u63D2\u5EA7\u5361 (Lucid Safe Switch)",card_safe_desc:"\u652F\u6301\u4EC5\u5141\u8BB8\u5F00\u673A\u9501\u6B7B\u6216\u4E8C\u6B21\u786E\u8BA4\u65AD\u7535\u7684\u4FDD\u62A4\u63D2\u5EA7\u5361\u7247"},en:{unavailable:"Unavailable",missing_entity:"Entity not found",on:"On",off:"Off",bri_label:"Brightness",temp_label:"Temp",warm:"Warm",neutral:"Day",cool:"Cool",light_off_hint:"Off \xB7 Drag slider to turn on",light_off_val:"Off",fan_gear:"S{n}",fan_current_gear:"On \xB7 Speed {n}",fan_current_pct:"On \xB7 {pct}%",fan_off_hint:"Off \xB7 Tap speed to start",ac_room:"Room {t}\xB0",ac_mode_off:"Off",ac_mode_cool:"Cool",ac_mode_heat:"Heat",ac_mode_heat_cool:"Auto",ac_mode_auto:"Auto",ac_mode_dry:"Dry",ac_mode_fan_only:"Fan",ac_state_off:"Off",safe_locked_badge:"\u{1F512} Locked",safe_confirm_badge:"\u{1F6E1}\uFE0F Protected",safe_tap_again_badge:"\u26A0\uFE0F Tap Again",safe_turn_on_badge:"\u26A1 Turn On",safe_blocked_hint:"\u26A0\uFE0F Turn-off blocked",safe_lock_hint:"On-only, turn-off disabled",safe_confirm_hint:"Double-tap to turn off",safe_confirm_armed_hint:"Tap again to cut power",safe_off_hint:"Tap button to restore power",safe_seg_lock:"Lock",safe_seg_confirm:"2-Tap",ed_entity:"Entity",ed_name:"Display Name (optional)",ed_icon:"Custom Icon (optional)",ed_show_bri:"Show brightness slider",ed_show_temp:"Show color temperature slider",ed_drag_on:"Drag slider while off to turn on",ed_gears:"Speed gear count (optional, auto-detected by default)",ed_step:"Temperature step (default 0.5\xB0)",ed_protection:"Protection Mode",ed_prot_lock:"Lock Off (Turn-on only, block turning off)",ed_prot_confirm:"Double-Tap Confirm before turning off",ed_power_entity:"Power Sensor Entity (optional, shows wattage)",ed_show_mode_switch:"Show Lock / 2-Tap mode switcher on card",ed_compact:"Single-row compact mode (hide bottom hint bar)",card_light_name:"Lucid Light Card",card_light_desc:"Explicit toggle switch + side-by-side labeled brightness & color temp sliders",card_fan_name:"Lucid Fan Card",card_fan_desc:"Explicit toggle switch + direct speed gear buttons",card_climate_name:"Lucid Climate Card",card_climate_desc:"Compact temperature stepper + clear HVAC mode buttons",card_safe_name:"Lucid Safe Switch Card",card_safe_desc:"Outlet protection card with Turn-On-Only lock or double-tap confirmation"}};function v(h,g){if(g==="zh"||g==="en")return g;let t=h?.language||h?.locale?.language||(typeof navigator<"u"?navigator.language:"zh");return String(t).toLowerCase().startsWith("zh")?"zh":"en"}function i(h,g,t){let e=U[h][g]??U.zh[g]??g;if(t)for(let[n,s]of Object.entries(t))e=e.replaceAll(`{${n}}`,String(s));return e}var L=`
  :host {
    display: block;
    box-sizing: border-box;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  ha-card {
    padding: 10px 12px;
    border-radius: var(--ha-card-border-radius, 12px);
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, rgba(127, 127, 127, 0.16)));
    box-shadow: var(--ha-card-box-shadow, none);
    color: var(--primary-text-color);
    user-select: none;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }
  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
  }
  .left-info {
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
    flex: 1;
    cursor: pointer;
  }
  .icon-wrap {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(127, 127, 127, 0.12);
    color: var(--secondary-text-color);
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  .icon-wrap ha-icon {
    --mdc-icon-size: 19px;
  }
  .titles {
    min-width: 0;
    flex: 1;
  }
  .name {
    font-size: 13.5px;
    font-weight: 500;
    line-height: 1.25;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sub {
    font-size: 11.5px;
    line-height: 1.25;
    margin-top: 2px;
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-variant-numeric: tabular-nums;
  }
  .sub.warn {
    color: #f59e0b;
    font-weight: 500;
  }
  .switch-btn {
    display: inline-flex;
    align-items: center;
    border: none;
    background: transparent;
    padding: 2px 0 2px 4px;
    cursor: pointer;
    flex-shrink: 0;
  }
  .switch-track {
    width: 38px;
    height: 22px;
    border-radius: 999px;
    background: rgba(127, 127, 127, 0.3);
    position: relative;
    transition: background-color 0.2s ease;
  }
  .switch-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    position: absolute;
    top: 2px;
    left: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.28);
    transition: transform 0.2s ease;
  }
  .switch-track.on .switch-thumb {
    transform: translateX(16px);
  }
  .bottom-sep {
    margin-top: 8px;
    padding-top: 7px;
    border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.14));
  }
`;var X=`
  ${L}
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
`,Y=["off","cool","heat","heat_cool","auto","dry","fan_only"],J={off:"#64748b",cool:"#3b82f6",heat:"#f97316",dry:"#06b6d4",fan_only:"#10b981",auto:"#8b5cf6",heat_cool:"#8b5cf6"},Q={off:"mdi:air-conditioner",cool:"mdi:snowflake",heat:"mdi:fire",dry:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:thermostat-auto",heat_cool:"mdi:thermostat-auto"},M=class extends HTMLElement{constructor(){super();this._config=null;this._hass=null;this._rendered=!1;this._modesKey="";this.attachShadow({mode:"open"})}static getConfigElement(){return document.createElement("lucid-climate-card-editor")}static getStubConfig(t){return{type:"custom:lucid-climate-card",entity:(t?Object.keys(t.states).find(n=>n.startsWith("climate.")):void 0)||"climate.example"}}setConfig(t){if(!t||!t.entity)throw new Error("Entity is required for lucid-climate-card");this._config=t,this._modesKey="",this._ensureDom(),this._update()}set hass(t){this._hass=t,this._ensureDom(),this._update()}get hass(){return this._hass}getCardSize(){return 2}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_lang(){return v(this._hass,this._config?.language)}_modeLabel(t,e){let n={off:"ac_mode_off",cool:"ac_mode_cool",heat:"ac_mode_heat",heat_cool:"ac_mode_heat_cool",auto:"ac_mode_auto",dry:"ac_mode_dry",fan_only:"ac_mode_fan_only"};return n[t]?i(e,n[t]):t}_ensureDom(){if(this._rendered||!this.shadowRoot)return;this._rendered=!0,this.shadowRoot.innerHTML=`
      <style>${X}</style>
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
            <button class="step-btn" id="minusBtn" type="button" aria-label="Decrease Temperature">\u2212</button>
            <span class="target-temp" id="targetTemp">--</span>
            <button class="step-btn" id="plusBtn" type="button" aria-label="Increase Temperature">+</button>
          </div>
        </div>
        <div class="modes-grid bottom-sep" id="modesGrid"></div>
      </ha-card>
    `;let t=this.shadowRoot,e=n=>{n.preventDefault(),this._config&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this._config.entity}}))};t.getElementById("infoArea").addEventListener("click",e),t.getElementById("infoArea").addEventListener("contextmenu",e),t.getElementById("minusBtn").addEventListener("click",n=>{n.stopPropagation(),this._stepTemperature(-1)}),t.getElementById("plusBtn").addEventListener("click",n=>{n.stopPropagation(),this._stepTemperature(1)})}_stepTemperature(t){if(!this._hass||!this._config)return;let e=this._hass.states[this._config.entity];if(!e)return;let n=e.attributes||{},s=Number(this._config.step||n.target_temp_step||.5),o=Number(n.min_temp??16),a=Number(n.max_temp??30),r=Number(n.temperature??25),d=Math.min(a,Math.max(o,Math.round((r+t*s)*10)/10));this._hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:d})}_rebuildModes(t,e){let n=this.shadowRoot.getElementById("modesGrid");n.style.gridTemplateColumns=`repeat(${t.length}, minmax(0, 1fr))`,n.innerHTML="";for(let s of t){let o=document.createElement("button");o.type="button",o.className="mode-btn",o.dataset.mode=s,o.textContent=this._modeLabel(s,e),o.addEventListener("click",a=>{a.stopPropagation(),!(!this._hass||!this._config)&&this._hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:s})}),n.appendChild(o)}this._modesKey=`${e}:${t.join(",")}`}_update(){if(!this._rendered||!this._config||!this._hass||!this.shadowRoot)return;let t=this.shadowRoot,e=this._lang(),n=this._hass.states[this._config.entity],s=t.getElementById("nameEl"),o=t.getElementById("subEl"),a=t.getElementById("iconEl"),r=t.getElementById("iconWrap"),d=t.getElementById("stepper"),c=t.getElementById("targetTemp"),f=t.getElementById("modesGrid");if(!n){s.textContent=this._config.name||this._config.entity,o.textContent=i(e,"missing_entity"),d.classList.add("hidden"),f.classList.add("hidden");return}let l=n.attributes||{},_=n.state;if(s.textContent=this._config.name||l.friendly_name||this._config.entity,a.setAttribute("icon",this._config.icon||Q[_]||l.icon||"mdi:air-conditioner"),r.className=`icon-wrap ${_&&_!=="off"?`mode-${_}`:""}`,_==="unavailable"){o.textContent=i(e,"unavailable"),d.classList.add("hidden");return}let x=l.temperature!=null;if(d.classList.toggle("hidden",!x),x){let y=Number(l.temperature);c.textContent=`${Number.isInteger(y)?y.toFixed(0):y.toFixed(1)}\xB0`}let b=l.current_temperature,u=_==="off"?i(e,"ac_state_off"):this._modeLabel(_,e);o.textContent=b!=null?`${u} \xB7 ${i(e,"ac_room",{t:b})}`:u;let w=[...Array.isArray(this._config.modes)?this._config.modes:Array.isArray(l.hvac_modes)?l.hvac_modes:["off","cool","heat","dry","fan_only"]].sort((y,z)=>{let C=Y.indexOf(y),B=Y.indexOf(z);return(C===-1?99:C)-(B===-1?99:B)}),m=`${e}:${w.join(",")}`;this._modesKey!==m&&w.length>0&&this._rebuildModes(w,e),f.classList.toggle("hidden",w.length===0);let p=J[_]||"#3b82f6";f.style.setProperty("--mode-accent",p),f.querySelectorAll(".mode-btn").forEach(y=>{y.classList.toggle("active",y.dataset.mode===_)})}};var Z=`
  ${L}
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
`,R=class extends HTMLElement{constructor(){super();this._config=null;this._hass=null;this._rendered=!1;this._gearCount=0;this.attachShadow({mode:"open"})}static getConfigElement(){return document.createElement("lucid-fan-card-editor")}static getStubConfig(t){return{type:"custom:lucid-fan-card",entity:(t?Object.keys(t.states).find(n=>n.startsWith("fan.")):void 0)||"fan.example"}}setConfig(t){if(!t||!t.entity)throw new Error("Entity is required for lucid-fan-card");this._config=t,this._gearCount=0,this._ensureDom(),this._update()}set hass(t){this._hass=t,this._ensureDom(),this._update()}get hass(){return this._hass}getCardSize(){return 2}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_lang(){return v(this._hass,this._config?.language)}_computeGearCount(t){if(this._config?.gears&&this._config.gears>=2&&this._config.gears<=8)return Math.round(this._config.gears);let e=Number(t.percentage_step||0);return e>=12.5&&e<=50?Math.max(2,Math.min(8,Math.round(100/e))):e>0&&e<12.5?5:6}_ensureDom(){if(this._rendered||!this.shadowRoot)return;this._rendered=!0,this.shadowRoot.innerHTML=`
      <style>${Z}</style>
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
    `;let t=this.shadowRoot,e=n=>{n.stopPropagation(),this._hass&&this._config&&this._hass.callService("fan","toggle",{entity_id:this._config.entity})};t.getElementById("toggleBtn").addEventListener("click",e),t.getElementById("infoArea").addEventListener("click",e),t.getElementById("infoArea").addEventListener("contextmenu",n=>{n.preventDefault(),this._config&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this._config.entity}}))})}_rebuildGears(t,e){let n=this.shadowRoot.getElementById("gearsGrid");n.style.gridTemplateColumns=`repeat(${t}, minmax(0, 1fr))`,n.innerHTML="";for(let s=1;s<=t;s++){let o=Math.min(100,Math.round(s/t*100)),a=document.createElement("button");a.type="button",a.className="gear-btn",a.dataset.gear=String(s),a.dataset.pct=String(o),a.textContent=i(e,"fan_gear",{n:s}),a.addEventListener("click",r=>{r.stopPropagation(),!(!this._hass||!this._config)&&this._hass.callService("fan","set_percentage",{entity_id:this._config.entity,percentage:o})}),n.appendChild(a)}this._gearCount=t}_update(){if(!this._rendered||!this._config||!this._hass||!this.shadowRoot)return;let t=this.shadowRoot,e=this._lang(),n=this._hass.states[this._config.entity],s=t.getElementById("nameEl"),o=t.getElementById("subEl"),a=t.getElementById("iconEl"),r=t.getElementById("iconWrap"),d=t.getElementById("swTrack"),c=t.getElementById("gearsGrid");if(!n){s.textContent=this._config.name||this._config.entity,o.textContent=i(e,"missing_entity"),c.classList.add("hidden");return}let f=n.attributes||{};if(a.setAttribute("icon",this._config.icon||f.icon||"mdi:fan"),s.textContent=this._config.name||f.friendly_name||this._config.entity,n.state==="unavailable"){o.textContent=i(e,"unavailable"),r.classList.remove("on"),d.classList.remove("on");return}let l=this._computeGearCount(f);this._gearCount!==l?this._rebuildGears(l,e):c.querySelectorAll(".gear-btn").forEach(u=>{u.textContent=i(e,"fan_gear",{n:Number(u.dataset.gear)})}),c.classList.remove("hidden");let _=n.state==="on",x=Number(f.percentage||0),b=_&&x>0?Math.max(1,Math.min(l,Math.round(x/100*l))):0;r.classList.toggle("on",_),d.classList.toggle("on",_),_?b>0?o.textContent=i(e,"fan_current_gear",{n:b}):o.textContent=i(e,"on"):o.textContent=i(e,"fan_off_hint"),c.querySelectorAll(".gear-btn").forEach(u=>{let E=Number(u.dataset.gear);u.classList.toggle("active",_&&E===b)})}};var tt=`
  ${L}
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
`,H=class extends HTMLElement{constructor(){super();this._config=null;this._hass=null;this._rendered=!1;this._draggingBri=!1;this._draggingTemp=!1;this.attachShadow({mode:"open"})}static getConfigElement(){return document.createElement("lucid-light-card-editor")}static getStubConfig(t){return{type:"custom:lucid-light-card",entity:(t?Object.keys(t.states).find(n=>n.startsWith("light.")):void 0)||"light.example"}}setConfig(t){if(!t||!t.entity)throw new Error("Entity is required for lucid-light-card");this._config=t,this._ensureDom(),this._update()}set hass(t){this._hass=t,this._ensureDom(),this._update()}get hass(){return this._hass}getCardSize(){return 2}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_lang(){return v(this._hass,this._config?.language)}_kelvinWord(t,e){return t<=3500?i(e,"warm"):t>=5300?i(e,"cool"):i(e,"neutral")}_ensureDom(){if(this._rendered||!this.shadowRoot)return;this._rendered=!0,this.shadowRoot.innerHTML=`
      <style>${tt}</style>
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
    `;let t=this.shadowRoot,e=r=>{r.stopPropagation(),!(!this._hass||!this._config)&&this._hass.callService("light","toggle",{entity_id:this._config.entity})};t.getElementById("toggleBtn").addEventListener("click",e),t.getElementById("infoArea").addEventListener("click",e),t.getElementById("infoArea").addEventListener("contextmenu",r=>{r.preventDefault(),this._openMoreInfo()});let n=t.getElementById("briSlider"),s=t.getElementById("briVal");n.addEventListener("pointerdown",()=>{this._draggingBri=!0}),n.addEventListener("input",()=>{let r=Number(n.value);n.style.setProperty("--bri-pct",`${r}%`),s.textContent=`${r}%`}),n.addEventListener("change",()=>{if(this._draggingBri=!1,!this._hass||!this._config)return;let r=this._hass.states[this._config.entity];if(r&&r.state!=="on"&&this._config.drag_to_turn_on===!1){this._update();return}let d=Number(n.value);this._hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:d})});let o=t.getElementById("tempSlider"),a=t.getElementById("tempVal");o.addEventListener("pointerdown",()=>{this._draggingTemp=!0}),o.addEventListener("input",()=>{let r=Number(o.value);a.textContent=`${this._kelvinWord(r,this._lang())} ${r}K`}),o.addEventListener("change",()=>{if(this._draggingTemp=!1,!this._hass||!this._config)return;let r=this._hass.states[this._config.entity];if(r&&r.state!=="on"&&this._config.drag_to_turn_on===!1){this._update();return}let d=Number(o.value),c=r?.attributes||{};c.min_color_temp_kelvin!=null||c.color_temp_kelvin!=null||c.min_mireds==null?this._hass.callService("light","turn_on",{entity_id:this._config.entity,color_temp_kelvin:d}):this._hass.callService("light","turn_on",{entity_id:this._config.entity,color_temp:Math.round(1e6/d)})})}_openMoreInfo(){this._config&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this._config.entity}}))}_update(){if(!this._rendered||!this._config||!this._hass||!this.shadowRoot)return;let t=this.shadowRoot,e=this._lang(),n=this._hass.states[this._config.entity],s=t.getElementById("nameEl"),o=t.getElementById("subEl"),a=t.getElementById("iconEl"),r=t.getElementById("iconWrap"),d=t.getElementById("swTrack"),c=t.getElementById("slidersGrid"),f=t.getElementById("briCol"),l=t.getElementById("tempCol"),_=t.getElementById("briLbl"),x=t.getElementById("tempLbl"),b=t.getElementById("briSlider"),u=t.getElementById("briVal"),E=t.getElementById("tempSlider"),w=t.getElementById("tempVal");if(_.textContent=i(e,"bri_label"),x.textContent=i(e,"temp_label"),!n){s.textContent=this._config.name||this._config.entity,o.textContent=i(e,"missing_entity"),c.classList.add("hidden");return}let m=n.attributes||{};if(a.setAttribute("icon",this._config.icon||m.icon||"mdi:ceiling-light"),s.textContent=this._config.name||m.friendly_name||this._config.entity,n.state==="unavailable"){o.textContent=i(e,"unavailable"),r.classList.remove("on"),d.classList.remove("on"),c.classList.add("off-dim");return}let p=n.state==="on",y=Array.isArray(m.supported_color_modes)?m.supported_color_modes:[],z=y.length===0?m.brightness!=null:y.some(j=>j!=="onoff"),C=this._config.show_brightness!==void 0?!!this._config.show_brightness:z,B=this._config.show_color_temp!==void 0?this._config.show_color_temp:this._config.has_color_temp,A=B!==void 0?!!B:y.includes("color_temp");f.classList.toggle("hidden",!C),l.classList.toggle("hidden",!A);let W=(C?1:0)+(A?1:0);c.classList.toggle("hidden",W===0),c.classList.toggle("single",W===1),c.classList.toggle("off-dim",!p),r.classList.toggle("on",p),d.classList.toggle("on",p);let I=m.brightness!=null?Math.max(1,Math.round(Number(m.brightness)/255*100)):p?100:0,G=Number(m.min_color_temp_kelvin||(m.max_mireds?Math.round(1e6/Number(m.max_mireds)):2700)),P=Number(m.max_color_temp_kelvin||(m.min_mireds?Math.round(1e6/Number(m.min_mireds)):6500)),V=Number(m.color_temp_kelvin||(m.color_temp?Math.round(1e6/Number(m.color_temp)):Math.round((G+P)/2)));if(E.min=String(G),E.max=String(P),C&&!this._draggingBri){let j=p?I:50;b.value=String(j),b.style.setProperty("--bri-pct",`${p?I:0}%`),u.textContent=p?`${I}%`:i(e,"light_off_val")}let q=this._kelvinWord(V,e);A&&!this._draggingTemp&&(E.value=String(Math.min(P,Math.max(G,V))),w.textContent=`${q} ${V}K`),p?C&&A?o.textContent=`${i(e,"on")} \xB7 ${I}% \xB7 ${q}`:C?o.textContent=`${i(e,"on")} \xB7 ${I}%`:o.textContent=i(e,"on"):o.textContent=W>0?i(e,"light_off_hint"):i(e,"off")}};var et=`
  ${L}
  ha-card {
    container-type: inline-size;
  }
  .icon-wrap {
    position: relative;
  }
  .icon-wrap.on {
    background: rgba(245, 158, 11, 0.18);
    color: #f59e0b;
  }
  .corner-badge {
    display: none;
    position: absolute;
    right: -3px;
    bottom: -3px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--ha-card-background, var(--card-background-color, #fff));
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    font-size: 9.5px;
    line-height: 15px;
    text-align: center;
  }
  .action-pill {
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.24));
    background: rgba(127, 127, 127, 0.12);
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
  @container (max-width: 230px) {
    .action-pill {
      display: none;
    }
    .corner-badge {
      display: block;
    }
  }
  .action-pill.turn-on {
    background: rgba(16, 185, 129, 0.16);
    border-color: rgba(16, 185, 129, 0.4);
    color: #10b981;
  }
  .action-pill.armed {
    background: rgba(239, 68, 68, 0.16);
    border-color: rgba(239, 68, 68, 0.45);
    color: #ef4444;
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
    color: #f59e0b;
    font-weight: 500;
  }
  .seg-group {
    display: inline-flex;
    align-items: center;
    border-radius: 5px;
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.24));
    overflow: hidden;
    flex-shrink: 0;
  }
  .seg-group.hidden {
    display: none;
  }
  .seg-btn {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    padding: 2px 7px;
    font-size: 11px;
    line-height: 1.25;
    white-space: nowrap;
    cursor: pointer;
  }
  .seg-btn.active {
    background: var(--primary-color, #3b82f6);
    color: #ffffff;
    font-weight: 500;
  }
`,D=class extends HTMLElement{constructor(){super();this._config=null;this._hass=null;this._rendered=!1;this._mode="lock";this._confirmArmed=!1;this._blockedFlash=!1;this._timer=null;this.attachShadow({mode:"open"})}static getConfigElement(){return document.createElement("lucid-safe-switch-card-editor")}static getStubConfig(t){return{type:"custom:lucid-safe-switch-card",entity:(t?Object.keys(t.states).find(n=>n.startsWith("switch.")):void 0)||"switch.example",protection:"lock",show_mode_switch:!0}}setConfig(t){if(!t||!t.entity)throw new Error("Entity is required for lucid-safe-switch-card");this._config=t,this._mode=t.protection==="confirm"?"confirm":"lock",this._clearTimers(),this._ensureDom(),this._update()}set hass(t){this._hass=t,this._ensureDom(),this._update()}get hass(){return this._hass}getCardSize(){return this._config?.compact?1:2}getGridOptions(){return{columns:this._config?.compact?6:12,min_columns:6,rows:"auto"}}_lang(){return v(this._hass,this._config?.language)}_clearTimers(){this._timer&&(clearTimeout(this._timer),this._timer=null),this._confirmArmed=!1,this._blockedFlash=!1}_domain(){let e=(this._config?.entity||"switch.unknown").split(".")[0];return["switch","input_boolean","light","fan"].includes(e)?e:"homeassistant"}_ensureDom(){if(this._rendered||!this.shadowRoot)return;this._rendered=!0,this.shadowRoot.innerHTML=`
      <style>${et}</style>
      <ha-card>
        <div class="top-row">
          <div class="left-info" id="infoArea">
            <div class="icon-wrap" id="iconWrap">
              <ha-icon id="iconEl" icon="mdi:power-socket-ch"></ha-icon>
              <span class="corner-badge" id="cornerBadge">\u{1F512}</span>
            </div>
            <div class="titles">
              <div class="name" id="nameEl"></div>
              <div class="sub" id="subEl"></div>
            </div>
          </div>
          <button class="action-pill" id="actionBtn" type="button"></button>
        </div>
        <div class="footer-row bottom-sep" id="footerRow">
          <span class="hint-txt" id="hintTxt"></span>
          <div class="seg-group" id="segGroup">
            <button class="seg-btn" id="segLock" type="button"></button>
            <button class="seg-btn" id="segConfirm" type="button"></button>
          </div>
        </div>
      </ha-card>
    `;let t=this.shadowRoot,e=n=>{n.stopPropagation(),this._onActionClick()};t.getElementById("actionBtn").addEventListener("click",e),t.getElementById("infoArea").addEventListener("click",e),t.getElementById("infoArea").addEventListener("contextmenu",n=>{n.preventDefault(),this._config&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this._config.entity}}))}),t.getElementById("segLock").addEventListener("click",n=>{n.stopPropagation(),this._clearTimers(),this._mode="lock",this._update()}),t.getElementById("segConfirm").addEventListener("click",n=>{n.stopPropagation(),this._clearTimers(),this._mode="confirm",this._update()})}_onActionClick(){if(!this._hass||!this._config)return;let t=this._hass.states[this._config.entity];if(!t||t.state==="unavailable")return;if(!(t.state==="on")){this._clearTimers(),this._hass.callService(this._domain(),"turn_on",{entity_id:this._config.entity});return}if(this._mode==="lock"){this._clearTimers(),this._blockedFlash=!0,this._update(),this._timer=setTimeout(()=>{this._blockedFlash=!1,this._update()},2400);return}if(!this._confirmArmed){this._clearTimers(),this._confirmArmed=!0,this._update(),this._timer=setTimeout(()=>{this._confirmArmed=!1,this._update()},3500);return}this._clearTimers(),this._hass.callService(this._domain(),"turn_off",{entity_id:this._config.entity}),this._update()}_readPowerText(){if(!this._hass||!this._config)return null;if(this._config.power_entity){let s=this._hass.states[this._config.power_entity];if(s&&s.state!=="unavailable"&&s.state!=="unknown"){let o=s.attributes?.unit_of_measurement||"W",a=Number(s.state);return Number.isNaN(a)?`${s.state}${o}`:`${a>=10?Math.round(a):Math.round(a*10)/10}${o}`}}let e=this._hass.states[this._config.entity]?.attributes||{},n=e.current_power_w??e.power??e.load_power;if(n!=null&&!Number.isNaN(Number(n))){let s=Number(n);return`${s>=10?Math.round(s):Math.round(s*10)/10}W`}return null}_update(){if(!this._rendered||!this._config||!this._hass||!this.shadowRoot)return;let t=this.shadowRoot,e=this._lang(),n=this._hass.states[this._config.entity],s=t.getElementById("nameEl"),o=t.getElementById("subEl"),a=t.getElementById("iconEl"),r=t.getElementById("iconWrap"),d=t.getElementById("cornerBadge"),c=t.getElementById("actionBtn"),f=t.getElementById("footerRow"),l=t.getElementById("hintTxt"),_=t.getElementById("segGroup"),x=t.getElementById("segLock"),b=t.getElementById("segConfirm");if(f.classList.toggle("hidden",!!this._config.compact),_.classList.toggle("hidden",this._config.show_mode_switch===!1),x.textContent=i(e,"safe_seg_lock"),b.textContent=i(e,"safe_seg_confirm"),x.classList.toggle("active",this._mode==="lock"),b.classList.toggle("active",this._mode==="confirm"),!n){s.textContent=this._config.name||this._config.entity,o.textContent=i(e,"missing_entity"),c.textContent="--";return}let u=n.attributes||{};if(a.setAttribute("icon",this._config.icon||u.icon||"mdi:desktop-tower-monitor"),s.textContent=this._config.name||u.friendly_name||this._config.entity,n.state==="unavailable"){o.textContent=i(e,"unavailable"),r.classList.remove("on"),c.className="action-pill",c.textContent="--";return}let E=n.state==="on";r.classList.toggle("on",E);let w=this._readPowerText();if(o.classList.remove("warn"),l.classList.remove("warn"),!E){o.textContent=w?`${i(e,"off")} \xB7 ${w}`:i(e,"off"),c.className="action-pill turn-on",c.textContent=i(e,"safe_turn_on_badge"),d.textContent="\u26A1",l.textContent=i(e,"safe_off_hint");return}let m=this._config.compact?` \xB7 ${this._mode==="lock"?i(e,"safe_seg_lock"):i(e,"safe_seg_confirm")}`:"",p=w?`${i(e,"on")} \xB7 ${w}${m}`:`${i(e,"on")}${m}`;this._mode==="lock"?(c.className="action-pill",c.textContent=i(e,"safe_locked_badge"),d.textContent="\u{1F512}",this._blockedFlash?(l.textContent=i(e,"safe_blocked_hint"),l.classList.add("warn"),this._config.compact?(o.textContent=i(e,"safe_blocked_hint"),o.classList.add("warn")):o.textContent=p):(o.textContent=p,l.textContent=i(e,"safe_lock_hint"))):this._confirmArmed?(c.className="action-pill armed",c.textContent=i(e,"safe_tap_again_badge"),d.textContent="\u26A0\uFE0F",l.textContent=i(e,"safe_confirm_armed_hint"),l.classList.add("warn"),o.textContent=this._config.compact?i(e,"safe_confirm_armed_hint"):p,this._config.compact&&o.classList.add("warn")):(c.className="action-pill",c.textContent=i(e,"safe_confirm_badge"),d.textContent="\u{1F6E1}\uFE0F",o.textContent=p,l.textContent=i(e,"safe_confirm_hint"))}};var T=class extends HTMLElement{constructor(){super();this._config={};this._hass=null;this._form=null;this.attachShadow({mode:"open"})}setConfig(t){this._config={...t},this._render()}set hass(t){this._hass=t,this._render()}_lang(){return v(this._hass,this._config?.language)}_render(){if(!this.shadowRoot)return;this._form||(this.shadowRoot.innerHTML=`
        <style>
          :host {
            display: block;
            padding: 4px 0;
          }
        </style>
      `,this._form=document.createElement("ha-form"),this._form.addEventListener("value-changed",s=>{let o=s;if(!o.detail?.value)return;let a={...this._config,...o.detail.value};for(let[r,d]of Object.entries(a))(d===""||d===void 0)&&delete a[r];this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}),this.shadowRoot.appendChild(this._form));let t=this._lang(),e=this.getSchema(t),n=new Map;for(let s of e)n.set(s.name,i(t,s.labelKey));this._form.hass=this._hass,this._form.data={...this.getDefaults(),...this._config},this._form.schema=e.map(({name:s,required:o,selector:a})=>({name:s,required:o,selector:a})),this._form.computeLabel=s=>n.get(s.name)||s.name}},$=class extends T{getDefaults(){return{show_brightness:!0,drag_to_turn_on:!0}}getSchema(){return[{name:"entity",labelKey:"ed_entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",labelKey:"ed_name",selector:{text:{}}},{name:"icon",labelKey:"ed_icon",selector:{icon:{}}},{name:"show_brightness",labelKey:"ed_show_bri",selector:{boolean:{}}},{name:"show_color_temp",labelKey:"ed_show_temp",selector:{boolean:{}}},{name:"drag_to_turn_on",labelKey:"ed_drag_on",selector:{boolean:{}}}]}},N=class extends T{getDefaults(){return{}}getSchema(){return[{name:"entity",labelKey:"ed_entity",required:!0,selector:{entity:{domain:"fan"}}},{name:"name",labelKey:"ed_name",selector:{text:{}}},{name:"icon",labelKey:"ed_icon",selector:{icon:{}}},{name:"gears",labelKey:"ed_gears",selector:{number:{min:2,max:8,mode:"box"}}}]}},O=class extends T{getDefaults(){return{step:.5}}getSchema(){return[{name:"entity",labelKey:"ed_entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",labelKey:"ed_name",selector:{text:{}}},{name:"icon",labelKey:"ed_icon",selector:{icon:{}}},{name:"step",labelKey:"ed_step",selector:{select:{mode:"dropdown",options:[{value:.5,label:"0.5\xB0"},{value:1,label:"1.0\xB0"}]}}}]}},K=class extends T{getDefaults(){return{protection:"lock",show_mode_switch:!0,compact:!1}}getSchema(g){return[{name:"entity",labelKey:"ed_entity",required:!0,selector:{entity:{domain:["switch","input_boolean","light"]}}},{name:"name",labelKey:"ed_name",selector:{text:{}}},{name:"icon",labelKey:"ed_icon",selector:{icon:{}}},{name:"protection",labelKey:"ed_protection",selector:{select:{mode:"dropdown",options:[{value:"lock",label:i(g,"ed_prot_lock")},{value:"confirm",label:i(g,"ed_prot_confirm")}]}}},{name:"power_entity",labelKey:"ed_power_entity",selector:{entity:{domain:"sensor"}}},{name:"show_mode_switch",labelKey:"ed_show_mode_switch",selector:{boolean:{}}},{name:"compact",labelKey:"ed_compact",selector:{boolean:{}}}]}};function S(h,g){customElements.get(h)||customElements.define(h,g)}S("lucid-light-card",H);S("lucid-fan-card",R);S("lucid-climate-card",M);S("lucid-safe-switch-card",D);S("lucid-light-card-editor",$);S("lucid-fan-card-editor",N);S("lucid-climate-card-editor",O);S("lucid-safe-switch-card-editor",K);var F="https://github.com/kukushouhou/ha-lucid-cards",k=v(null);window.customCards=window.customCards||[];var nt=[{type:"lucid-light-card",name:i(k,"card_light_name"),description:i(k,"card_light_desc"),preview:!0,documentationURL:F},{type:"lucid-fan-card",name:i(k,"card_fan_name"),description:i(k,"card_fan_desc"),preview:!0,documentationURL:F},{type:"lucid-climate-card",name:i(k,"card_climate_name"),description:i(k,"card_climate_desc"),preview:!0,documentationURL:F},{type:"lucid-safe-switch-card",name:i(k,"card_safe_name"),description:i(k,"card_safe_desc"),preview:!0,documentationURL:F}];for(let h of nt)window.customCards.some(g=>g.type===h.type)||window.customCards.push(h);var it="0.1.0";console.info(`%c LUCID-CARDS %c v${it} `,"background:#f59e0b;color:#111827;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px;","background:#1f2937;color:#f9fafb;font-weight:600;padding:2px 6px;border-radius:0 4px 4px 0;");export{M as LucidClimateCard,O as LucidClimateCardEditor,R as LucidFanCard,N as LucidFanCardEditor,H as LucidLightCard,$ as LucidLightCardEditor,D as LucidSafeSwitchCard,K as LucidSafeSwitchCardEditor};
