import React from "react";

import { MuiLink, MuiExternalLink } from "../util/links";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import ThermostatIcon from "@material-ui/icons/Whatshot";
import ProgramIcon from "@material-ui/icons/AccessTime";
import MoviesIcon from "@material-ui/icons/Theaters";
import TorrentsIcon from "@material-ui/icons/CloudDownload";

const useStyles = makeStyles(() => ({
  list: {
    width: 250,
  },
}));

export const SidebarMenu = ({ toggleDrawer }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={MuiLink} exact to={"/"}>
          <ListItemIcon>
            <ThermostatIcon />
          </ListItemIcon>
          <ListItemText primary="Thermostat" />
        </ListItem>
        <ListItem button component={MuiLink} to={"/schedule"}>
          <ListItemIcon>
            <ProgramIcon />
          </ListItemIcon>
          <ListItemText primary="Schedule" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={MuiExternalLink} to="/transmission/">
          <ListItemIcon>
            <TorrentsIcon />
          </ListItemIcon>
          <ListItemText primary="Torrents" />
        </ListItem>
        <ListItem button component={MuiExternalLink} to="/emby/">
          <ListItemIcon>
            <MoviesIcon />
          </ListItemIcon>
          <ListItemText primary="Media Server" />
        </ListItem>
      </List>
    </div>
  );
};
