import React, { useEffect, useState } from "react";
import { useInterval } from "../../hooks";
import { CurrentTemperature } from "./CurrentTemperature";
import { ThermostatControls } from "./ThermostatControls";
import { ThermostatStatus } from "./ThermostatStatus";

import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  thermostat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ddd",
    margin: "0 auto",
    color: theme.palette.text.primary,
    boxSizing: "border-box",
  },
  section: {
    border: "1px solid #ccc",
    padding: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    borderTop: "1px solid #ddd",
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

export const Thermostat = ({ apiDomain }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    ambientTemp: 0,
    targetTemp: 0,
    powerState: false,
    boilerState: false,
    weather: {},
    uptime: "00:00:00:00",
  });

  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(true);

  useInterval(() => {
    console.log("interval");
    //setLoadData(true)
  }, 5000);

  useEffect(() => {
    if (!loading && loadData) {
      setLoading(true);
      fetch(`${apiDomain}status`)
        .then((resp) => resp.json())
        .then((data) => {
          setState({
            ambientTemp: data.temperature,
            targetTemp: data.desiredTemp,
            boilerState: data.boilerState,
            powerState: data.powerState,
            uptime: data.uptime,
            weather: data.weather,
          });
          setLoadData(false);
          setLoading(false);
        });
    }
  }, [loading, loadData, apiDomain]);

  const onPowerChange = (powerState) => setState({ ...state, powerState });
  const onTargetTemperatureChange = (targetTemp) => setState({ ...state, targetTemp });

  return (
    <div className={classes.thermostat}>
      <Box className={classes.section}>
        <CurrentTemperature ambientTemp={state.ambientTemp} weather={state.weather} />
      </Box>

      <Box className={classes.section}>
        <ThermostatControls
          targetTemp={state.targetTemp}
          powerState={state.powerState}
          onPowerChange={onPowerChange}
          onTargetTemperatureChange={onTargetTemperatureChange}
        />
      </Box>

      <Box className={classes.section}>
        <ThermostatStatus boilerState={state.boilerState} uptime={state.uptime} />
      </Box>
    </div>
  );
};
