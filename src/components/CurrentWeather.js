import React from 'react';
import 'weather-underground-icons/dist/wu-icons-style.css';


const CurrentWeather = (props) => (
    <div>
        <div className="current-weather">
            <i className={`wu wu-black wu-128 wu-${props.iconName}`}></i>
            <h1>{props.temperature}&#176; {props.temperatureScale}</h1>
        </div>
        <div className="current-weather-details">{props.description}</div>
    </div>
);

CurrentWeather.defaultProps = {
    temperature: '?',
    iconName: 'unknown',
    description: 'unknown',
    temperatureScale: 'C'
};

export default CurrentWeather;