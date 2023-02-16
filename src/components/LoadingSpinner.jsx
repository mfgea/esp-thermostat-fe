import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: "rgba(255,255,255,.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  ring: {
    display: "inline-block",
    position: "relative",
    width: "64px",
    height: "64px",

    "& div": {
      boxSizing: "border-box",
      display: "block",
      position: "absolute",
      width: "100%",
      height: "100%",
      border: "6px solid #666",
      borderRadius: "50%",
      animation: "$rcs-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
      borderColor: "#666 transparent transparent transparent",
    },

    "& div:nth-child(1)": {
      animationDelay: "-0.45s",
    },

    "& div:nth-child(2)": {
      animationDelay: "-0.3s",
    },

    "& div:nth-child(3)": {
      animationDelay: "-0.15s",
    },
  },
  "@keyframes rcs-ring": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

export const LoadingSpinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.overlay}>
      <div className={classes.ring}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
