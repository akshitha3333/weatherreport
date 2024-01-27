const apiKey = "9839e8f0784b33a2c4e45970235b027d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=9839e8f0784b33a2c4e45970235b027d&units=metric&q=";

const searchBox = document.querySelector(".Search input");
const searchBtn = document.querySelector(".Search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorText = document.querySelector(".error");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

function updateWeather(data) {
  errorText.style.display = "none";
  weatherIcon.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  tempElement.textContent = data.main.temp + "°C";
  cityElement.textContent = data.name;
  humidityElement.textContent = data.main.humidity + "%";
  windElement.textContent = data.wind.speed + " km/h";
}

function showError() {
  errorText.style.display = "block";
  weatherIcon.src = "";
  tempElement.textContent = "";
  cityElement.textContent = "";
  humidityElement.textContent = "";
  windElement.textContent = "";
}

async function getWeatherData(city) {
  try {
    const response = await fetch(apiUrl + city);
    if (!response.ok) {
      showError();
      return;
    }
    const data = await response.json();
    updateWeather(data);
  } catch (error) {
    console.error(error);
    showError();
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city === "") return;
  getWeatherData(city);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value.trim();
    if (city === "") return;
    getWeatherData(city);
  }
});
