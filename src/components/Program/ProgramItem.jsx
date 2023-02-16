import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from 'clsx';

import OnIcon from "@material-ui/icons/Power";
import TemperatureIcon from "../../icons/Thermometer";
import OffIcon from "@material-ui/icons/PowerOff";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    alignItems: "stretch",
    minHeight: 70,
    background: "#f9f9f9",
    margin: `${theme.spacing(1)}px 0`,
  },
  iconContainer: {
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
  },
  iconOff: {
    background: "#ff6961",
  },
  iconOn: {
    background: "#77dd77",
  },
  iconChange: {
    background: "#96b9d0",
  },
  textContainer: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
  },
}));

export const ProgramItem = ({ program }) => {

  const { enabled=false, cron={}, operation={} } = program;

  let op = 'change';
  if (operation.type === 'setPower') {
    op = operation.power ? 'on' : 'off';
  }

  const classes = useStyles();
  const opIconClass = {
    on: 'iconOn',
    off: 'iconOff',
    change: 'iconChange',
  }[op];

  const OpIcon = {
    on: OnIcon,
    off: OffIcon,
    change: TemperatureIcon,
  }[op];

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let dayName = 'day';
  if (cron.weekDay >= 0 && cron.weekDay < weekDays.length) {
    dayName = weekDays[cron.weekDay];
  }

  return (
    <ListItem className={classes.root} disabled={!enabled}>
      <ListItemIcon className={clsx(classes.iconContainer, classes[opIconClass])}>
        <OpIcon />
      </ListItemIcon>
      <ListItemText className={classes.textContainer}>
        Every {dayName} at {cron.hour}:{cron.minute} Hs
        <Typography variant="subtitle2" component="div">
          { operation.type==='setTemp'
            ? `Set to ${operation.temp} &deg;C`
            : `Power ${operation.power ? 'ON': 'OFF'}`
          }          
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        <Switch
          edge="end"
          onChange={() => true}
          checked={enabled}
          color="primary"
          inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
