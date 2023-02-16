import React from "react";
import { Time } from "./Time";
import { SidebarMenu } from './SidebarMenu';

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform: "uppercase",
  },
}));

export const Header = ({ title }) => {
  const [openSidebar, setOpenSidebar] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenSidebar(open);
  };

  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={toggleDrawer(true)}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" className={classes.title}>
            {title}
          </Typography>
          <Time />
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={openSidebar}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <SidebarMenu toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </>
  );
};
