// 1

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
//

function showCurrentTemp(response) {
  let tempature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = `${tempature}`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind} mph`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#weather-desc");
  let capitalizedDescription =
    description.charAt(0).toUpperCase() + description.slice(1);
  currentDescription.innerHTML = `${capitalizedDescription}`;
}

function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${cityInput.value}`;
  let apiKey = "9d256541562f8d22893f524e36f1e610";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  axios
    .get(`${apiUrl}q=${cityInput.value}&appid=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
}
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchInput);

//
function showLocationTemp(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${city}`;

  let tempature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = `${tempature}`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind} mph`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#weather-desc");
  currentDescription.innerHTML = `${description}`;
  let capitalizedDescription =
    description.charAt(0).toUpperCase() + description.slice(1);
  currentDescription.innerHTML = `${capitalizedDescription}`;
}

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "9d256541562f8d22893f524e36f1e610";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
    .then(showLocationTemp);
}
navigator.geolocation.getCurrentPosition(showPosition);

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
searchForm.addEventListener("submit", search);

// 3

//

function temperatureFahrenheit(event) {
  event.preventDefault();
  let currentDegrees = document.querySelector("#temp");
  if (document.getElementById("tempfar").innerHTML === "°C") {
    currentDegrees.innerHTML = 5;
  } else {
    currentDegrees.innerHTML = 41;
  }

  console.log({ nj: document.getElementById("tempcel").innerHTML });
  if (document.getElementById("tempfar").innerHTML === "°F") {
    let text = document.getElementById("tempcel").innerHTML;
    document.getElementById("tempcel").innerHTML = text.replace("°C", "°F");

    let textBack = document.getElementById("tempfar").innerHTML;
    document.getElementById("tempfar").innerHTML = textBack.replace("°F", "°C");
  } else {
    let text = document.getElementById("tempcel").innerHTML;
    document.getElementById("tempcel").innerHTML = text.replace("°F", "°C");

    let textBack = document.getElementById("tempfar").innerHTML;
    document.getElementById("tempfar").innerHTML = textBack.replace("°C", "°F");
  }
}

let fahrenheit = document.querySelector("#tempfar");
fahrenheit.addEventListener("click", temperatureFahrenheit);

//
