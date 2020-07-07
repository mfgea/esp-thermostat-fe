import React from 'react';
import './ThermostatStatus.scss';

export const ThermostatStatus = ({ boilerState, uptime }) => {
    const boilerClassName = `boiler-state ${boilerState ? 'on': 'off'}`;

    return (
        <section id="status-container">
            <div className="uptime">
                Uptime
                <span className="uptime-value">{uptime}</span>
            </div>
            <div className={boilerClassName}>
                <i className="fa fa-fire fa-3x" />
            </div>
        </section>
    );
};