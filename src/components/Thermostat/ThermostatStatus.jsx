import React from "react";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-around",
  },
  uptime: {
    color: "#666",
    fontSize: "0.8rem",
  },
  uptimeValue: {
    display: "block",
  },

  boilerState: {
    color: "#ccc",
  },

  boilerStateOn: {
    color: "rgb(222, 84, 69)",
  },
}));

export const ThermostatStatus = ({ boilerState, uptime }) => {
  const classes = useStyles();
  const boilerClassName = boilerState
    ? classes.boilerStateOn
    : classes.boilerState;

  return (
    <Box className={classes.root}>
      <Box className={classes.uptime}>
        Uptime
        <span className={classes.uptimeValue}>{uptime}</span>
      </Box>
      <Box className={boilerClassName}>
        <i className="fa fa-fire fa-3x" />
      </Box>
    </Box>
  );
};
