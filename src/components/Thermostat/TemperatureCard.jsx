import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  tempCard: {
    display: "flex",
    minWidth: "70px",
    minHeight: "70px",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: "4rem",
    display: "flex",
    color: theme.palette.text.secondary,
    width: "90px",
    height: "90px",
    justifyContent: "center",
    alignItems: "center",
  },
  tempValue: {
    marginTop: ".5rem",
    fontSize: "1.8rem",
  },
}));

export const TemperatureCard = ({ value=0, weatherId }) => {
  const classes = useStyles();

  let Icon;
  if (weatherId) {
    Icon = <i className={clsx(classes.icon, `wi wi-owm-${weatherId}`)}></i>
  } else {
    Icon = <HomeIcon className={classes.icon} />;
  }

  return (
    <Box className={classes.tempCard}>
      {Icon}
      <Typography variant="h5" className={classes.tempValue}>
        {value.toFixed(1)} &deg;C
      </Typography>
    </Box>
  );
};
