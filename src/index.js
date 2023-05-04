let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = "0" + minute;
}
let time = `${hour}:${minute}`;

document.querySelector("h3").innerHTML = `${day}, ${time}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  
          <div class="col-2 weather-forecast-card">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
         
            <img class="small-icon" src="media/${
              forecastDay.weather[0].icon
            }.png" alt="" width="45" />
            
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperatures-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="weather-forecast-temperatures-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentTemp(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperature = Math.round(celsiusTemperature);
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = `${temperature}`;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind} mph`;

  let iconElement = document.querySelector("#big-icon");
  iconElement.setAttribute("src", `media/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#weather-desc");
  let capitalizedDescription =
    description.charAt(0).toUpperCase() + description.slice(1);
  currentDescription.innerHTML = `${capitalizedDescription}`;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "9d256541562f8d22893f524e36f1e610";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  axios
    .get(`${apiUrl}q=${city}&appid=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
}

function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${cityInput.value}`;
  searchCity(cityInput.value);
}
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchInput);

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "9d256541562f8d22893f524e36f1e610";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);

// 2

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#search-form");

function temperatureFahrenheit(event) {
  event.preventDefault();

  let currentDegrees = document.querySelector("#temp");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  if (document.getElementById("tempfar").innerHTML === "°C") {
    currentDegrees.innerHTML = Math.round(celsiusTemperature);
    document.getElementById("tempcel").innerHTML = "°C";
    document.getElementById("tempfar").innerHTML = "°F";
  } else {
    currentDegrees.innerHTML = Math.round(fahrenheitTemperature);
    document.getElementById("tempcel").innerHTML = "°F";
    document.getElementById("tempfar").innerHTML = "°C";
  }
}

let fahrenheit = document.querySelector("#tempfar");
fahrenheit.addEventListener("click", temperatureFahrenheit);

searchCity("Kyiv");
