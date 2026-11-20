export const BASE_CARD_STYLES = `
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
`;
