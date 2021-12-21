const apiKey = 'fe79f292b12f6fa0da9ff561cba92215';
let currentCityEl = document.querySelector('#currentCity');
let fiveDayEl = document.querySelector('#fiveDay');
let fiveDayTitleEl = document.querySelector('#fiveDayTitle');
let mainEl = document.querySelector('main')
let savedButtonsEl = document.querySelector('.savedButtons');
let searchButtonEl = document.querySelector('.searchButton');
let todaysDate = moment().format("L");
let todaysWeatherEl = document.querySelector('#todaysWeather');
let weatherDataEl = document.querySelector('#weatherData');


//add event listener to search button
searchButtonEl.addEventListener('click', function getData() {
    savedButtonsEl.innerHTML = '';
    fiveDayEl.innerHTML = '';
    weatherDataEl.textContent = '';

    input = document.querySelector("#cityQuery")
    userInput = input.value;
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=fe79f292b12f6fa0da9ff561cba92215&units=imperial";

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            latitude = data.coord.lat;
            longitude = data.coord.lon;
            let todaysOneUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude={part}&appid=10265beafaf4ca91897568ef6f7efa26&units=imperial';
            //fetches weather data
            fetch(todaysOneUrl)
                .then(function (response) {
                    return response.json();
                })

                .then(function (data) {
                        todaysWeatherEl.setAttribute('style', 'display:flex')

                        cityName = data.name
                        currentCityEl.textContent = (cityName + " (" + todaysDate + ') ');

                        todayTemp = data.current.temp
                        let currentTemp = document.createElement('p')
                        currentTemp.innerText = 'Current Temperature: ' + todayTemp + "F";


                        todayHumidity = data.current.humidity
                        let currentHumidity = document.createElement('p')
                        currentHumidity.innerText = 'Current Humidity: ' + todayHumidity + "%";


                        todayWind = data.current.wind_speed
                        let currentWind = document.createElement('p')
                        currentWind.innerText = 'Current Wind Speed: ' + todayWind + 'mph';

                        weatherDataEl.append(currentWind, currentHumidity, currentTemp)


                        todayIcon = data.current.weather[0].icon;
                        let iconAppend = document.createElement("img");
                        let iconUrl = 'http://openweathermap.org/img/wn/' + todayIcon + '@2x.png'
                        iconAppend.setAttribute('src', iconUrl);
                        iconAppend.setAttribute('style', 'width:100px; height:100px')
                        currentCityEl.append(iconAppend);

                        let tempFiveDay = [];
                        let windFiveDay = [];
                        let humidityFiveDay = [];
                        let iconFiveDay = [];
                        let fiveDayIcon = [];

                        for (i = 0; i < 5; i++) {
                            //pulling api data
                            tempFiveDay[i] = data.daily[i].temp.day;
                            console.log(tempFiveDay[i])
                            windFiveDay[i] = data.daily[i].wind_speed.day;
                            console.log(windFiveDay[i])
                            humidityFiveDay[i] = data.daily[i].humidity.day;

                            iconFiveDay[i] = data.daily[i].weather[0].icon;
                            fiveDayIcon[i] = 'http://openweathermap.org/img/wn/' + iconFiveDay[i] + '@2x.png';

                            let fiveDayTemp = document.createElement('div')
                            let fiveDayWind = document.createElement('div')
                            let fiveDayHumidity = document.createElement('div')
                            let fiveDayImg = document.createElement('img')

                            fiveDayTemp.innerText = "Temp: " + tempFiveDay[i] + " F"
                            fiveDayWind.innerText = fiveDayWind[i] + "mph"
                            fiveDayHumidity = fiveDayHumidity[i] + "%"
                            fiveDayImg = fiveDayIcon[i];

                            fiveDayEl.append(fiveDayTemp, fiveDayWind, fiveDayHumidity, fiveDayImg);
                        }
                })
        })
})