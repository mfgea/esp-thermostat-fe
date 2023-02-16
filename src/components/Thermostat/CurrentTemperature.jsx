import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import { TemperatureCard } from "./TemperatureCard";

const useStyles = makeStyles((theme) => ({
  tempCards: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  cityName: {
    marginTop: "1rem",
  },
}));

export const CurrentTemperature = ({ ambientTemp, weather }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.tempCards}>
        <TemperatureCard value={ambientTemp} />
        <TemperatureCard value={weather.temp} weatherId={weather.id} />
      </Box>
      <Box className={classes.cityName}>Mar del Plata</Box>
    </>
  );
};
