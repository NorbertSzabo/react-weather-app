export const API = {
    APP_ID: 'appid=8d9b60f885d927a17a31cf3a6fc8d600',
    SCALE_UNIT: 'units=metric',
    DATA_TYPE: 'mode=json',

    CURRENT_WEATHER_URL: (locationName) => `http://api.openweathermap.org/data/2.5/weather?q=${locationName}&${API.APP_ID}&${API.DATA_TYPE}&${API.SCALE_UNIT}`,

    HOURLY_FORCAST_URL: (locationName) => `http://api.openweathermap.org/data/2.5/forecast?q=${locationName}&${API.APP_ID}&${API.DATA_TYPE}&${API.SCALE_UNIT}`
};