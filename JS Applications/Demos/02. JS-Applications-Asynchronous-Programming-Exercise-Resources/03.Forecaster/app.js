function attachEvents() {

    const getWeatherBtn = document.getElementById('submit');
    const input = document.getElementById('location');

    getWeatherBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const currentOutp = document.getElementById('current');
        const upcomingOutp = document.getElementById('upcoming');

        const currDayToReset = currentOutp.querySelector('div[class="forecasts"]');

        if (currDayToReset) {
            currentOutp.removeChild(currDayToReset);
        }

        const threeDayToReset = upcomingOutp.querySelector('div[class="forecast-info"]');

        if (threeDayToReset) {
            upcomingOutp.removeChild(threeDayToReset);
        }

        const currCondition = await getCurrCondition();
        const upComingCondition = await getUpCommingCondition();
        input.value = '';

        const foreCast = document.getElementById('forecast');
        foreCast.style.display = 'block';

        const currentForcast = createCurrentForcast(currCondition);
        currentOutp.appendChild(currentForcast);


        const upCommingForcast = createUpCommingForcast(upComingCondition);
        upcomingOutp.appendChild(upCommingForcast);
    })

    function createUpCommingForcast(upComingCondition) {
        const threeDayArr = upComingCondition.forecast;

        const info = document.createElement('div');
        info.classList.add('forecast-info');

        threeDayArr
            .forEach(day => {
                const condition = day.condition;
                const high = day.high;
                const low = day.low;

                const currentDay = createUpCommingCurrentDay(condition, high, low);
                info.appendChild(currentDay);
            });

        return info;
    }

    function createUpCommingCurrentDay(condition, high, low) {
        const upCommingSpan = document.createElement('span');
        upCommingSpan.classList.add('upcoming');

        const symbolSpan = document.createElement('span');
        symbolSpan.classList.add('symbol');
        const symbol = findSymbol(condition);
        symbolSpan.textContent = symbol;

        const lowToHighSpan = document.createElement('span');
        lowToHighSpan.classList.add('forecast-data');
        lowToHighSpan.textContent = `${low}${'\u00B0'}/${high}${'\u00B0'}`;

        const conditionSpan = document.createElement('span');
        conditionSpan.textContent = `${condition}`;

        upCommingSpan.appendChild(symbolSpan);
        upCommingSpan.appendChild(lowToHighSpan);
        upCommingSpan.appendChild(conditionSpan);

        return upCommingSpan;
    }

    function createCurrentForcast(currCondition) {
        //unnecessary names starting with span
        const condition = currCondition.forecast.condition;
        const low = currCondition.forecast.low;
        const high = currCondition.forecast.high;
        const nameCityCount = currCondition.name;

        const divForcast = document.createElement('div');
        divForcast.classList.add('forecasts');

        const spanCondSymbol = document.createElement('span');
        spanCondSymbol.classList.add('condition');
        spanCondSymbol.classList.add('symbol');
        const symbol = findSymbol(condition);
        spanCondSymbol.textContent = symbol;

        const spanCondition = document.createElement('span');
        spanCondition.classList.add('condition');

        const spanCityCountry = document.createElement('span');
        spanCityCountry.classList.add('forecast-data');
        spanCityCountry.textContent = `${nameCityCount}`;

        const spanLowToHigh = document.createElement('span');
        spanLowToHigh.classList.add('forecast-data');
        spanLowToHigh.textContent = `${low}${'\u00B0'}/${high}${'\u00B0'}`;

        const spanWeather = document.createElement('span');
        spanWeather.classList.add('forecast-data');
        spanWeather.textContent = `${condition}`;

        spanCondition.appendChild(spanCityCountry);
        spanCondition.appendChild(spanLowToHigh);
        spanCondition.appendChild(spanWeather);

        divForcast.appendChild(spanCondSymbol);
        divForcast.appendChild(spanCondition);

        return divForcast;
    }

    function findSymbol(weather) {
        let symbol = null;

        switch (weather) {
            case 'Rain':
                symbol = '\u2614';
                break;

            case 'Partly sunny':
                symbol = '\u26C5';
                break;

            case 'Overcast':
                symbol = '\u2601';
                break;

            case 'Sunny':
                symbol = '\u2600';
                break;

            case 'Degrees':
                symbol = '\u00B0';
                break;
        }

        return symbol;
    }
    async function getLocations() {

        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const nameInp = document.getElementById('location').value;

        const data = await returnData(url);

        const locationCode = data
            .find(x => x.name == nameInp);

        if (!locationCode) {
            throw new Error('Invalid');
        }

        return locationCode.code;
    }

    async function getCurrCondition() {
        const locationCode = await getLocations();
        const url = `http://localhost:3030/jsonstore/forecaster/today/` + locationCode;

        const data = await returnData(url);

        return data;
    }

    async function getUpCommingCondition() {
        const locationCode = await getLocations();
        const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`;

        const data = await returnData(url);

        return data;
    }

    async function returnData(url) {
        const res = await fetch(url);
        const data = await res.json();
        
        return data;
    }
}



attachEvents();



