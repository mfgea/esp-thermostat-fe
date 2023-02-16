import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Thermostat } from "./components/Thermostat";
import { Program } from "./components/Program";
import { EditItem } from "./components/Program/EditItem";
import { Header } from "./components/Header";

import Container from "@material-ui/core/Container";

import "./App.scss";

import { unstable_createMuiStrictModeTheme as createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { grey, green, common } from "@material-ui/core/colors";

const Theme = createMuiTheme({
  palette: {
    primary: {
      ...green,
      contrastText: common.white,
    },
    secondary: {
      ...grey,
      contrastText: common.white,
    },
  },
});

const useStyles = makeStyles({
  main: {
    position: 'relative',
  },
});

function App() {
  const apiDomain = window.apiDomain || "/api/";

  const classes = useStyles();
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Container className={classes.main} maxWidth="xs">
          <Switch>
            <Route path="/schedule">
              <Header title="Schedules" />
              <Program apiDomain={apiDomain} />
            </Route>
            <Route exact path="/">
              <Header title="Thermostat" />
              <Thermostat apiDomain={apiDomain} />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
