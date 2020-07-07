import React, { useCallback, useState } from "react";
import Toggle from "react-toggle";
import Checkbox from "rc-checkbox";
import "react-toggle/style.css";
import "../styles/rc-checkbox.scss";
import "./ThermostatControls.scss";

const formatNumber = (num) =>
  num.toLocaleString(navigator.language, { minimumFractionDigits: 1 });

export const ThermostatControls = (props) => {
  const {
    targetTemp,
    powerState,
    programmedTemp,
    programmedOnEnabled,
    programmedOffEnabled,
    programmedOnTime,
    programmedOffTime,
    onPowerChange,
    onTargetTemperatureChange,
    onProgrammedTemperatureChange,
    onProgrammedOnToggle,
    onProgrammedOffToggle,
    onProgrammedOnTime,
    onProgrammedOffTime,
  } = props;
  let [activePane, setActivePane] = useState("manual");
  const setManualPane = useCallback(() => setActivePane("manual"), []);
  const setAutoPane = useCallback(() => setActivePane("auto"), []);
  const _onPowerChange = (e) => {
    onPowerChange(Boolean(e.target.checked));
  };
  const _onIncTemp = () => onTargetTemperatureChange(targetTemp + 0.5);
  const _onDecTemp = () => onTargetTemperatureChange(targetTemp - 0.5);
  const _onIncProgrammedTemp = () =>
    onProgrammedTemperatureChange(programmedTemp + 0.5);
  const _onDecProgrammedTemp = () =>
    onProgrammedTemperatureChange(programmedTemp - 0.5);
  const _onProgrammedOnTime = (e) => onProgrammedOnTime(e.target.value || null);
  const _onProgrammedOffTime = (e) => onProgrammedOffTime(e.target.value || null);

  const _onProgrammedOnToggle = (e) => {
      onProgrammedOnToggle(e.target.checked);
  }
  const _onProgrammedOffToggle = (e) => onProgrammedOffToggle(e.target.checked);

  return (
    <section>
      <div className="power-controls">
        <button
          onClick={setManualPane}
          className={activePane === "manual" ? "active" : ""}
        >
          Manual
        </button>
        <button
          onClick={setAutoPane}
          className={activePane === "auto" ? "active" : ""}
        >
          Auto
        </button>
      </div>

      {activePane === "manual" && (
        <div className="controls-pane manual-controls">
          <div className="power-toggle">
            <label htmlFor="power-switch">Power</label>
            <Toggle
              id="power-switch"
              onChange={_onPowerChange}
              icons={false}
              className="power-switch"
              checked={powerState}
            />
          </div>
          <div className="temp-controls">
            <button className="temperature-button" onClick={_onDecTemp}>
              <i className="fa fa-minus-circle fa-3x" />
            </button>
            <span className="temp-value">
              {formatNumber(targetTemp)} &deg;C
            </span>
            <button className="temperature-button" onClick={_onIncTemp}>
              <i className="fa fa-plus-circle fa-3x" />
            </button>
          </div>
        </div>
      )}

      {activePane === "auto" && (
        <div className="controls-pane auto-controls">
          <div className="time-pickers">
            <div className="schedule-control" disabled={!programmedOnEnabled}>
              <Checkbox onClick={_onProgrammedOnToggle} checked={programmedOnEnabled} />
              <label>On</label>
              <input type="time" disabled={!programmedOnEnabled} value={programmedOnTime} onChange={_onProgrammedOnTime} />
            </div>
            <div className="schedule-control" disabled={!programmedOffEnabled}>
              <Checkbox onClick={_onProgrammedOffToggle} checked={programmedOffEnabled} />
              <label>Off</label>
              <input type="time" disabled={!programmedOffEnabled} value={programmedOffTime} onChange={_onProgrammedOffTime} />
            </div>
          </div>

          <div className="programmed-temp" disabled={!programmedOnEnabled}>
            <button className="temperature-button" disabled={!programmedOnEnabled} onClick={_onIncProgrammedTemp}>
              <i className="fa fa-plus-circle fa-3x" />
            </button>
            <span className="temp-value">
              {formatNumber(programmedTemp)} &deg;C
            </span>
            <button className="temperature-button" disabled={!programmedOnEnabled} onClick={_onDecProgrammedTemp}>
              <i className="fa fa-minus-circle fa-3x" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
