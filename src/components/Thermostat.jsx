import React, { useEffect, useState } from 'react';
import { Time } from './Time';
import { CurrentTemperature } from './CurrentTemperature';
import { ThermostatControls } from './ThermostatControls';
import { ThermostatStatus } from './ThermostatStatus';

import './Thermostat.scss';

export const Thermostat = ({ apiDomain }) => {
    const [ambientTemp, setAmbientTemp] = useState(18);
    const [targetTemp, setTargetTemp] = useState(21);
    const [powerState, setPowerState] = useState(true);
    const [boilerState, setBoilerState] = useState(true);

    const [programmedTemp, setProgrammedTemp] = useState(22);
    const [programmedOnTime, setProgrammedOnTime] = useState(null);
    const [programmedOffTime, setProgrammedOffTime] = useState(null);
    const [programmedOnEnabled, setProgrammedOnEnabled] = useState(false);
    const [programmedOffEnabled, setProgrammedOffEnabled] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const [uptime, setUptime] = useState("00:00:00:00");
  
    useEffect(() =>{
      let interval = setInterval(() => setLoadData(true), (1000 * 5))
      //destroy interval on unmount
      return () => clearInterval(interval)
    });
  
    useEffect(() => {
      if (!loading && loadData) {
        setLoading(true);
        fetch(`${apiDomain}/status`)
          .then(resp => resp.json())
          .then(data => {
            setAmbientTemp(data.temperature);
            setTargetTemp(data.desiredTemp);
            setBoilerState(data.boilerState);
            setPowerState(data.powerState);
            setUptime(data.uptime);
          })
      }
    }, [loading, loadData, apiDomain])  

    const onPowerChange = (state) => setPowerState(state);
    const onTargetTemperatureChange = (temp) => setTargetTemp(temp);
    const onProgrammedTemperatureChange = (temp) => setProgrammedTemp(temp);
    const onProgrammedOnTime = (time) => setProgrammedOnTime(time);
    const onProgrammedOffTime = (time) => setProgrammedOffTime(time);
    const onProgrammedOnToggle = (state) => setProgrammedOnEnabled(state);
    const onProgrammedOffToggle = (state) => setProgrammedOffEnabled(state);

    return (
        <div className="thermostat">
            <header>
                <h1>Thermostat</h1>
                <Time />
            </header>
            
            <CurrentTemperature
                ambientTemp={ambientTemp}
            />

            <ThermostatControls
                targetTemp={targetTemp}
                powerState={powerState}
                programmedTemp={programmedTemp}
                programmedOnTime={programmedOnTime}
                programmedOffTime={programmedOffTime}
                programmedOnEnabled={programmedOnEnabled}
                programmedOffEnabled={programmedOffEnabled}
                onPowerChange={onPowerChange}
                onTargetTemperatureChange={onTargetTemperatureChange}
                onProgrammedTemperatureChange={onProgrammedTemperatureChange}
                onProgrammedOnTime={onProgrammedOnTime}
                onProgrammedOffTime={onProgrammedOffTime}
                onProgrammedOnToggle={onProgrammedOnToggle}
                onProgrammedOffToggle={onProgrammedOffToggle}
            />

            <ThermostatStatus
                boilerState={boilerState}
                uptime={uptime}
            />
        </div>
    );
};
