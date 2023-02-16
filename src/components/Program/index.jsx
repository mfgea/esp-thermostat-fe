import React, { useEffect, useState } from "react";
import { Redirect, useParams } from 'react-router-dom';
import { useInterval } from "../../hooks";
import { makeStyles, Box, List } from "@material-ui/core";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { ProgramItem } from "./ProgramItem";

const useStyles = makeStyles((theme) => ({
  program: {
    border: "1px solid #ddd",
    position: 'relative',
    paddingBottom: 50
  },
  list: {},
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 10,
  }
}));

const tasks = [
  {
    id: "123",
    enabled: true,
    cron: {
      minute: 30,
      hour: 8,
      weekDay: 1,
    },
    operation: {
      type: "setParams",
      temp: 25.5,
      power: true,
    },
  },
  {
    id: "124",
    enabled: false,
    cron: {
      minute: 0,
      hour: 6,
      weekDay: 1,
    },
    operation: {
      type: "setTemp",
      temp: 21,
    },
  },
  {
    id: "125",
    enabled: true,
    cron: {
      minute: 30,
      hour: 12,
      weekDay: -1,
    },
    operation: {
      type: "setPower",
      power: false,
    },
  },
  {
    id: "126",
    enabled: true,
    cron: {
      minute: 30,
      hour: 8,
      weekDay: 3,
    },
    operation: {
      type: "setPower",
      power: true,
    },
  },
  {
    id: "127",
    enabled: true,
    cron: {
      minute: 30,
      hour: 1,
      weekDay: 1,
    },
    operation: {
      type: "setParams",
      temp: 25.5,
      power: true,
    },
  },
];

export const Program = ({ apiDomain }) => {
  const classes = useStyles();
  const { id = null } = useParams();
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState(tasks);
  const [editItem, setEditItem] = useState(null);

  useInterval(() => {
    console.log("interval");
    //setLoadData(true)
  }, 5000);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      fetch(`${apiDomain}scheduledTasks`)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setPrograms(data.programs);
        });
    }
  }, [loading, apiDomain]);

  const handleAddNew = () => setEditItem('new');

  if(editItem) {
    return <Redirect to={`schedule/${editItem}`} />
  }

  

  return (
    <Box className={classes.program}>
      <Fab
        size="medium"
        color="secondary"
        aria-label="add"
        className={classes.addButton}
        onClick={handleAddNew}
      >
        <AddIcon />
      </Fab>

      <List className={classes.list}>
        {programs.map((p) => (
          <ProgramItem key={p.id} program={p} />
        ))}
      </List>
    </Box>
  );
};
