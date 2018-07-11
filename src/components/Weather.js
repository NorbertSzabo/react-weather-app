import React, {Component} from 'react';
import CurrentWeather from "./CurrentWeather";
import SwithCelsiusFarrenheit from "./SwithCelsiusFarrenheit";


class Weather extends Component {

    constructor() {
        super();

        this.state = {
            temperatureScale: 'C',
            currentWeather: {
                temperature: 24,
                description: 'sunny',
                iconName: 'sunny'
            }
        };

        this.changeTemperatureScale = this.changeTemperatureScale.bind(this);
    }

    changeTemperatureScale(value) {
        // no difference
        if (value === this.state.temperatureScale) return;

        let {temperature, ...rest} = this.state.currentWeather;

        temperature = (value !== 'C')
            ? /*C to F*/ temperature * 9 / 5 + 32
            : /*F to C*/ (temperature - 32) * 5 / 9;

        let currentWeather = {temperature, ...rest};
        this.setState({
            temperatureScale: value,
            currentWeather: currentWeather
        });
    }

    render() {
        return (
            <div className="weather-container">
                <SwithCelsiusFarrenheit handleScaleChange={this.changeTemperatureScale}/>
                <CurrentWeather
                    temperatureScale={this.state.temperatureScale}
                    temperature={this.state.currentWeather.temperature}
                    iconName={this.state.currentWeather.iconName}
                    description={this.state.currentWeather.description}
                />
            </div>
        )
    }
}

export default Weather;