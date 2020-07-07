import React, { useState } from 'react';
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useInterval } from '../hooks';

const getFormattedDate = () => {
    return format(new Date(), 'PP H:mm', { locale: es });
}

export const Time = () => {
    let [time, setTime] = useState(getFormattedDate());

    useInterval(() => setTime(getFormattedDate()), 1000)
    return (<div className="time">{time}</div>);
}
