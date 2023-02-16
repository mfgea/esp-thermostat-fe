import React from "react";
import clsx from "clsx";
import { makeStyles, Box, IconButton, Typography } from "@material-ui/core";

import AddIcon from "@material-ui/icons/AddCircle";
import RemoveIcon from "@material-ui/icons/RemoveCircle";

const formatNumber = (num) =>
  num.toLocaleString(navigator.language, { minimumFractionDigits: 1 });

const useStyles = makeStyles((theme) => ({
  tempControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
  },
  temperatureButton: {
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  tempValue: {
    fontSize: "1.8rem",

    "&.disabled": {
      color: theme.palette.text.disabled,
    },
  },
}));

export const TemperatureInput = (props) => {
  const classes = useStyles();

  const { targetTemp, disabled = false, onTargetTemperatureChange } = props;

  const _onIncTemp = () => onTargetTemperatureChange(targetTemp + 0.5);
  const _onDecTemp = () => onTargetTemperatureChange(targetTemp - 0.5);

  return (
    <Box className={classes.tempControls}>
      <IconButton
        color="default"
        className={classes.temperatureButton}
        onClick={_onDecTemp}
        disabled={disabled}
      >
        <RemoveIcon fontSize="large" />
      </IconButton>
      <Typography className={clsx(classes.tempValue, { disabled: disabled })}>
        {formatNumber(targetTemp)} &deg;C
      </Typography>
      <IconButton
        color="default"
        className={classes.temperatureButton}
        onClick={_onIncTemp}
        disabled={disabled}
      >
        <AddIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};
