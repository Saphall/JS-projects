const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  var data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "clouds.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "rain.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "clear.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "mist.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "snow.png";
  }
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchButton.addEventListener("click", () => getWeather(searchBox.value));
