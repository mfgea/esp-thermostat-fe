import React, { useCallback } from "react";
import { makeStyles, Box } from "@material-ui/core";

import { TemperatureInput } from '../TemperatureInput';

const useStyles = makeStyles((theme) => ({
  powerControls: {
    display: "flex",
    flexFlow: "row nowrap",

    "& button": {
      background: "white",
      minWidth: 55,
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
      border: `1px solid ${theme.palette.primary.main}`,
      outline: "none",
      cursor: "pointer",

      "&:hover": {
        background: theme.palette.grey[100],
      },

      "&.active": {
        background: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
      },

      "&:first-child": {
        borderRadius: "3px 0 0 3px",
        borderRight: "none",
      },

      "&:last-child": {
        borderRadius: "0 3px 3px 0",
        borderLeft: "none",
      },
    },
  },

  powerToggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  controlsPane: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "110px",

    "& label": {
      marginRight: theme.spacing(1),
      paddingBottom: theme.spacing(0.5),
    },
  },
}));

export const ThermostatControls = (props) => {
  const classes = useStyles();

  const {
    targetTemp,
    powerState,
    onPowerChange,
    onTargetTemperatureChange,
  } = props;

  const setPowerOn = useCallback(() => onPowerChange(true), [onPowerChange]);
  const setPowerOff = useCallback(() => onPowerChange(false), [onPowerChange]);

  return (
    <Box>
      <Box className={classes.controlsPane}>
        <Box className={classes.powerToggle}>
          <label>Power</label>
          <Box className={classes.powerControls}>
            <button onClick={setPowerOn} className={powerState ? "active" : ""}>
              On
            </button>
            <button
              onClick={setPowerOff}
              className={!powerState ? "active" : ""}
            >
              Off
            </button>
          </Box>
        </Box>
        <TemperatureInput
          disabled={!powerState}
          targetTemp={targetTemp}
          onTargetTemperatureChange={onTargetTemperatureChange}
          />
      </Box>
    </Box>
  );
};
