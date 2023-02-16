import React, { useState } from "react";
import { useParams, Redirect } from 'react-router-dom';

import {
  Box,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  withStyles,
  makeStyles,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { TemperatureInput } from "../TemperatureInput";
import { LoadingSpinner } from '../LoadingSpinner';
import { useEffect } from "react";

const ColorButton = withStyles((theme) => ({
  root: {
    color: red[400],
    "&:hover": {
      color: red[600],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    borderTop: 0,
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  subtitle: {
    paddingTop: theme.spacing(1),
  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "baseline",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  daySelect: {
    minWidth: 120,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  timeInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  opSelect: {
    minWidth: 160,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  deleteButton: {
    marginRight: "auto",
  },
}));

export const EditItem = () => {
  let { id = 'new' } = useParams();
  const newSchedule = id === 'new';

  const classes = useStyles();
  const [ isSaving, setIsSaving ] = useState(false);
  const [ toSchedule, setToSchedule ] = useState(false);
  const [state, setState] = useState({
    targetTemp: 22,
    daySelect: -1,
    op: 'setTemp',
    time: '00:00',
  });

  useEffect(() => {

  }, [isSaving]);

  const handleOpChange = (e) => setState({ ...state, op: e.target.value });
  const handleTempChange = (targetTemp) => setState({ ...state, targetTemp });
  const handleDayChange = (e) => setState({ ...state, daySelect: e.target.value });
  const handleTimeChange = (e) => setState({ ...state, time: e.target.value });
  const handleSubmit = () => setIsSaving(true);
  const navigateToSchedule = () => setToSchedule(true);

  const handleDelete = () => {};

  if (toSchedule) {
    return <Redirect to='/schedule' />
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {isSaving && <LoadingSpinner />}
      <Typography className={classes.title} variant="h5">
        { newSchedule ? 'Create Schedule' : 'Edit Schedule' }
      </Typography>
      <Typography className={classes.subtitle} variant="h6">
        When:
      </Typography>
      <Box className={classes.container}>
        <InputLabel id="day-select-label">Run every</InputLabel>
        <Select
          labelId="day-select-label"
          className={classes.daySelect}
          onChange={handleDayChange}
          id="day-select"
          value={state.daySelect}
        >
          <MenuItem value={-1}>Day</MenuItem>
          <MenuItem value={1}>Monday</MenuItem>
          <MenuItem value={2}>Tuesday</MenuItem>
          <MenuItem value={3}>Wednesday</MenuItem>
          <MenuItem value={4}>Thursday</MenuItem>
          <MenuItem value={5}>Friday</MenuItem>
          <MenuItem value={6}>Saturday</MenuItem>
          <MenuItem value={7}>Sunday</MenuItem>
        </Select>
        <InputLabel id="at-label">at</InputLabel>
        <TextField
          id="time-input"
          label="Time"
          type="time"
          onChange={handleTimeChange}
          value={state.time}
          className={classes.timeInput}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </Box>
      <Typography className={classes.subtitle} variant="h6">
        What:
      </Typography>
      <Box className={classes.container}>
        <InputLabel id="operation-select-label">Set</InputLabel>
        <Select
          labelId="operation-select-label"
          onChange={handleOpChange}
          className={classes.opSelect}
          id="operation-select"
          value={state.op}
        >
          <MenuItem value={"setTemp"}>Temperature</MenuItem>
          <MenuItem value={"setPower"} disabled>Power</MenuItem>
          <MenuItem value={"setParams"} disabled>Temp and Power</MenuItem>
        </Select>
      </Box>
      <Box>
        <TemperatureInput
          disabled={false}
          targetTemp={state.targetTemp}
          onTargetTemperatureChange={handleTempChange}
        />
      </Box>
      <Box className={classes.actionsContainer}>
        {newSchedule || 
          <ColorButton className={classes.deleteButton} onClick={handleDelete}>
            Delete
          </ColorButton>
        }
        <Button color="secondary" onClick={navigateToSchedule}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </Box>
    </form>
  );
};
