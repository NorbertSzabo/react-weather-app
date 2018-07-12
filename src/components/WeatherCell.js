import React from 'react';
import 'weather-underground-icons/dist/wu-icons-style.css';

const WeatherCell = (props) => (
    <div className='weather-cell'>
        <div className='weather-cell-data'>
            <img src={`http://openweathermap.org/img/w/${props.iconName}.png`}/>
            {
                props.large
                    ? <h1>{props.temperature}&#176; {props.temperatureScale}</h1>
                    : <h4>{props.temperature}&#176; {props.temperatureScale}</h4>
            }

        </div>
        {
            props.large
                ? <h3 className="weather-cell-details">{props.description}</h3>
                : <div className="weather-cell-details">{props.description}</div>
        }
        {props.date && <div className="weather-cell-details">{props.date.split(" ")[1]}</div>}
    </div>
);

WeatherCell.defaultProps = {
    temperature: '?',
    iconName: '01d',
    description: '',
    temperatureScale: 'C',
    date: ''
};

export default WeatherCell;