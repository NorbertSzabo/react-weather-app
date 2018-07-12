export const convertCelsiusToFahrenheit = (temperatureInC) => {
    return Math.round((temperatureInC * 9 / 5 + 32) * 10) / 10;
};

export const convertFahrenheitToCelsius = (temperatureInF) => {
    return Math.round(((temperatureInF - 32) * 5 / 9) * 10) / 10;
};

export const callAPI = (method, url) => {
    return window.fetch(url, {method})
        .then(handleErrors)
        .then(res => res.json())
        .catch(er => {
            throw Error(er)
        });
};

function handleErrors(response) {
    if (!response.ok) {
        return response.json()
            .catch(() => {
                throw Error(`${response.statusText} (${response.status})`)
            })
            .then((err) => {
                throw Error(`${err.message} (${err.cod})`)
            })
    }
    return response;
}