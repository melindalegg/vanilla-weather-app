function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="https://openweathermap.org/img/wn/10d@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">18°</span>
                  <span class="weather-forecast-temperature-min"> 12°</span>
                </div>
              </div>`;
  });

  forecastHTML =
    forecastHTML +
    `              <div class="col-2">
                <div class="weather-forecast-date">Wed</div>
                <img
                  src="https://openweathermap.org/img/wn/10d@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">18°</span>
                  <span class="weather-forecast-temperature-min"> 12°</span>
                </div>
              </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "d47eof23tc4b1a80f28b4ddc9cf18ce6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric0`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", `response.data.condition.description`);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "d47eof23tc4b1a80f28b4ddc9cf18ce6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  search(cityInputElement.value);
}

function showFarenheitTemperature(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Auckland");
