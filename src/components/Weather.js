import React, {Component} from 'react';
import WeatherCell from './WeatherCell';
import SwithCelsiusFarrenheit from './SwithCelsiusFarrenheit';
import {callAPI, convertCelsiusToFahrenheit, convertFahrenheitToCelsius} from './../utils';
import {API} from './../constants';
import Forecast from "./Forecast";
import moment from 'moment';

class Weather extends Component {
    constructor() {
        super();
        // setting up a default state
        this.state = {
            location: 'Cluj-Napoca',
            currentDate: moment().format('DD.MM.YYYY'),
            temperatureScale: 'C',
            currentWeather: {
                temperature: null,
                description: null,
                iconName: undefined
            },
            weatherCells: [],
            errorMessage: ''
        };

        // bin some member function to the component's state
        this.changeTemperatureScale = this.changeTemperatureScale.bind(this);
    }

    componentWillMount() {
        // get current weather
        callAPI('GET', API.CURRENT_WEATHER_URL(this.state.location))
            .then(data => {
                if (data) {
                    const {temp/*, pressure, humidity, temp_min, temp_max*/} = data.main;
                    const {description, icon} = data.weather[0];
                    let currentWeather = {
                        temperature: temp,
                        description: description,
                        iconName: icon
                    };
                    this.setState({
                        currentWeather
                    })
                }
            })
            .catch(error => {
                this.setState({errorMessage: error.message});
            });

        // get forecast
        callAPI('GET', API.HOURLY_FORCAST_URL(this.state.location))
            .then(data => {
                const weatherEntires = data.list;
                const weatherCells = [];
                weatherEntires.map(w => {
                    const {temp/*, pressure, humidity, temp_min, temp_max*/} = w.main;
                    const {description, icon} = w.weather[0];
                    const {dt_txt: dateTxt} = w;

                    const weatherCell = {
                        temperature: temp,
                        iconName: icon,
                        description: description,
                        date: dateTxt
                    };
                    weatherCells.push(weatherCell);
                });
                this.setState({
                    weatherCells
                });
            })
            .catch(error => {
                this.setState({errorMessage: error.message});
            })
    }


    changeTemperatureScale(value) {
        if (this.state.temperatureScale === value) {
            // do nothing;
            return;
        }
        // extract the current temperature value from the component's state
        let {temperature, ...rest} = this.state.currentWeather;

        // transform the temperature value to the newly selected scale unit
        temperature = (value !== 'C')
            ? /*C to F*/  convertCelsiusToFahrenheit(temperature)
            : /*F to C*/ convertFahrenheitToCelsius(temperature);

        // compose the currentWeather object with the new temperature format
        let currentWeather = {temperature, ...rest};

        // update the state
        this.setState({
            temperatureScale: value,
            currentWeather: currentWeather
        });
    }

    render() {
        return (
            <div className='weather-container'>
                <ShowLocation
                    location={this.state.location}
                    currentDate={this.state.currentDate}
                />

                <SwithCelsiusFarrenheit
                    handleScaleChange={this.changeTemperatureScale}
                    selectedScale={this.state.temperatureScale}
                />

                <div className='current-weather'>
                    <WeatherCell
                        temperatureScale={this.state.temperatureScale}
                        temperature={this.state.currentWeather.temperature}
                        iconName={this.state.currentWeather.iconName}
                        description={this.state.currentWeather.description}
                        large
                    />
                </div>

                <Forecast weatherCells={this.state.weatherCells}/>

                {this.state.errorMessage && <p className='error-message'> {this.state.errorMessage} </p>}
            </div>
        )
    }
}

const ShowLocation = (props) => (
    <div className='location'>
        <h3> {props.location}, {props.currentDate} </h3>
    </div>
);
export default Weather;