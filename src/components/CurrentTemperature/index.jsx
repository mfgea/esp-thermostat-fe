import React from 'react';
import { TemperatureCard } from '../TemperatureCard';
//import WeatherInfo from '../util/openweather-maps';

import './CurrentTemperature.scss';

export const CurrentTemperature = ({ ambientTemp }) => (
    <section>
        <div className="temp-cards">
            <TemperatureCard
                icon="fa fa-home"
                value={ambientTemp} />
            <TemperatureCard
                icon="wi wi-day-rain"
                value="5" />
        </div>
        <div className="city-name">Mar del Plata</div>
    </section>
);