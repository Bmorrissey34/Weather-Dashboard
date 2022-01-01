const apiKey = 'fe79f292b12f6fa0da9ff561cba92215';
let currentCityEl = document.querySelector('#currentCity');
let fiveDayEl = document.querySelector('#fiveDay');
let fiveDayTitleEl = document.querySelector('#fiveDayTitle');
let humidityFive = document.querySelector("#humidity5")
let humidityFour = document.querySelector("#humidity4")
let humidityOne = document.querySelector("#humidity1")
let humidityThree = document.querySelector("#humidity3")
let humidityTwo = document.querySelector("#humidity2")
let mainEl = document.querySelector('main')
let savedButtonsEl = document.querySelector('.savedButtons');
let searchButtonEl = document.querySelector('.searchButton');
let tempFive = document.querySelector("#temp5")
let tempFour = document.querySelector("#temp4")
let tempOne = document.querySelector("#temp1")
let tempThree = document.querySelector("#temp3")
let tempTwo = document.querySelector("#temp2")
let todaysDate = moment().format("L");
let todaysWeatherEl = document.querySelector('#todaysWeather');
let weatherDataEl = document.querySelector('#weatherData');
let windSpeedFive = document.querySelector("#wind5")
let windSpeedFour = document.querySelector("#wind4")
let windSpeedOne = document.querySelector("#wind1")
let windSpeedThree = document.querySelector("#wind3")
let windSpeedTwo = document.querySelector("#wind2")

//add event listener to search button
searchButtonEl.addEventListener('click', function getData() {
    savedButtonsEl.innerHTML = '';
    weatherDataEl.textContent = '';
    tempOne.innerHTML = '';
    tempTwo.innerHTML = '';
    tempThree.innerHTML = '';
    tempFour.innerHTML = '';
    tempFive.innerHTML = '';
    humidityOne.innerHTML = ''; 
    humidityTwo.innerHTML = ''; 
    humidityThree.innerHTML = ''; 
    humidityFour.innerHTML = ''; 
    humidityFive.innerHTML = '';
    windSpeedOne.innerHTML = '';
    windSpeedTwo.innerHTML = '';
    windSpeedThree.innerHTML = '';
    windSpeedFour.innerHTML = '';
    windSpeedFive.innerHTML = '';
    

    input = document.querySelector("#cityQuery")
    userInput = input.value;
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=fe79f292b12f6fa0da9ff561cba92215&units=imperial";

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            cityName = data.name;
            currentCityEl.textContent = (cityName + " (" + todaysDate + ') ');
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
                    todayTemp = data.current.temp
                    let currentTemp = document.createElement('p')
                    currentTemp.innerText = 'Current Temperature: ' + todayTemp + "F";

                    todayHumidity = data.current.humidity
                    let currentHumidity = document.createElement('p')
                    currentHumidity.innerText = 'Current Humidity: ' + todayHumidity + "%";

                    todayWind = data.current.wind_speed
                    let currentWind = document.createElement('p')
                    currentWind.innerText = 'Current Wind Speed: ' + todayWind + 'mph';

                    todayUV = data.current.uvi
                    let currentUV = document.createElement('p')
                    currentUV.style.color = 'white';
                    currentUV.innerText = "Current UV Rating: " + todayUV 

                    if (todayUV > 7) 
                        currentUV.style.background = 'red';

                        else if (todayUV > 5) 
                        currentUV.style.background = 'yellow',
                        currentUV.style.color = 'black';

                        else 
                        currentUV.style.background = 'green';

                        
                        
                    

                    weatherDataEl.append(currentWind, currentHumidity, currentTemp, currentUV)

                    todayIcon = data.current.weather[0].icon;
                    let iconAppend = document.createElement("img");
                    let iconUrl = 'https://openweathermap.org/img/wn/' + todayIcon + '@2x.png'
                    iconAppend.setAttribute('src', iconUrl);
                    iconAppend.setAttribute('style', 'width:100px; height:100px')
                    currentCityEl.append(iconAppend);

                    let tempFiveDay = [];
                    let windFiveDay = [];
                    let humidityFiveDay = [];
                    let uvFiveDay = [];
                    let fiveDayIcon=[];


                    for (i = 0; i < 5; i++) {
                        //pulling api data
                        tempFiveDay[i] = data.daily[i].temp.day;
                        console.log(tempFiveDay[i])
                        windFiveDay[i] = data.daily[i].wind_speed;
                        console.log(windFiveDay[i])
                        humidityFiveDay[i] = data.daily[i].humidity;
                        console.log(humidityFiveDay[i])
                        uvFiveDay[i] = data.daily[i].uvi;
                        console.log(uvFiveDay[i])
                        fiveDayIcon[i]= data.daily[i].weather[0].icon;
                        console.log(fiveDayIcon[i])
                    }

                    let oneTemp = document.createElement("p")
                    oneTemp.innerText = tempFiveDay[0] + " *F "
                    let iconOne = document.createElement ('img')
                    iconOne.src = 'https://openweathermap.org/img/wn/' + fiveDayIcon[0] + '@2x.png';
                    iconOne.setAttribute('style', 'width: 30%; float: right;')
                    iconOne.innerHTML = fiveDayIcon[0]
                    tempOne.append(oneTemp, iconOne)

                    let twoTemp = document.createElement('p')
                    twoTemp.innerText = tempFiveDay[1] + " *F "
                    let iconTwo = document.createElement ('img')
                    iconTwo.src = 'https://openweathermap.org/img/wn/' + fiveDayIcon[1] + '@2x.png';
                    iconTwo.setAttribute('style', 'width: 30%; float: right;')
                    iconTwo.innerHTML = fiveDayIcon[1]
                    tempTwo.append(twoTemp, iconTwo)

                    let threeTemp = document.createElement('p')
                    threeTemp.innerText = tempFiveDay[2] + " *F "
                    let iconThree = document.createElement ('img')
                    iconThree.src = 'https://openweathermap.org/img/wn/' + fiveDayIcon[2] + '@2x.png';
                    iconThree.setAttribute('style', 'width: 30%; float: right;')
                    iconThree.innerHTML = fiveDayIcon[2]
                    tempThree.append(threeTemp, iconThree)

                    let fourTemp = document.createElement('p')
                    fourTemp.innerText = tempFiveDay[3] + " *F "
                    let iconFour = document.createElement ('img')
                    iconFour.src = 'https://openweathermap.org/img/wn/' + fiveDayIcon[3] + '@2x.png';
                    iconFour.setAttribute('style', 'width: 30%; float: right;')
                    iconFour.innerHTML = fiveDayIcon[3]
                    tempFour.append(fourTemp, iconFour)

                    let fiveTemp = document.createElement('p')
                    fiveTemp.innerText = tempFiveDay[4] + " *F "
                    let iconFive = document.createElement ('img')
                    iconFive.src = 'https://openweathermap.org/img/wn/' + fiveDayIcon[4] + '@2x.png';
                    iconFive.setAttribute('style', 'width: 30%; float: right;')
                    iconFive.innerHTML = fiveDayIcon[4]
                    tempFive.append(fiveTemp, iconFive)

                    let oneHumid = document.createElement('p')
                    oneHumid.innerText = humidityFiveDay[0] + " % "
                    humidityOne.append(oneHumid)

                    let twoHumid = document.createElement('p')
                    twoHumid.innerText = humidityFiveDay[1] + " % "
                    humidityTwo.append(twoHumid)

                    let threeHumid = document.createElement('p')
                    threeHumid.innerText = humidityFiveDay[2] + " % "
                    humidityThree.append(threeHumid)

                    let fourHumid = document.createElement('p')
                    fourHumid.innerText = humidityFiveDay[3] + " % "
                    humidityFour.append(fourHumid)

                    let fiveHumid = document.createElement('p')
                    fiveHumid.innerText = humidityFiveDay[4] + " % "
                    humidityFive.append(fiveHumid)

                    let oneWind = document.createElement('p')
                    oneWind.innerText = windFiveDay[0] + " mph"
                    windSpeedOne.append(oneWind)

                    let twoWind = document.createElement('p')
                    twoWind.innerText = windFiveDay[1] + " mph"
                    windSpeedTwo.append(twoWind)

                    let threeWind = document.createElement('p')
                    threeWind.innerText = windFiveDay[2] + " mph"
                    windSpeedThree.append(threeWind)

                    let fourWind = document.createElement('p')
                    fourWind.innerText = windFiveDay[3] + " mph"
                    windSpeedFour.append(fourWind)

                    let fiveWind = document.createElement('p')
                    fiveWind.innerText = windFiveDay[4] + " mph"
                    windSpeedFive.append(fiveWind)
                    
                })
        })
})