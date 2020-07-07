import React from 'react';
import './TemperatureCard.scss';

export const TemperatureCard = ({ icon, value }) => {
    return (
        <div className="temperature-card">
            <i className={icon} />
            <span className="temp-value">{value} &deg;C</span>
        </div>
    );
};
