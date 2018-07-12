import React from 'react';
import WeatherCell from "./WeatherCell";

const Forecast = (props) => (
    <div className='forecast-weather'>
        {
            props.weatherCells.map(
                (weatherCell, index) => {
                    const {temperature, iconName, description, date} = weatherCell;
                    return (
                        <WeatherCell
                            key={index}
                            temperature={temperature}
                            description={description}
                            iconName={iconName}
                            date={date}
                        />
                    )
                }
            )
        }
    </div>
);

Forecast.defaultProps = {
    weatherCells: []
};
export default Forecast;

