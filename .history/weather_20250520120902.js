const inputBox = document.getElementById('inputbar');
const search = document.getElementById('search');
const weather_img = document.querySelector(".weather-img");
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind-speed');
const location_not_found = document.querySelector(".location-not-found");
const weather_main = document.querySelector(".weather-body");

async function checkWeather(city) {
  const api_key = "070ef1e92d7c149ab6c1e33fd7180e0e";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  
  try {
    const response = await fetch(url);
    const weather_data = await response.json();

    if (weather_data.cod === "404") {
      location_not_found.style.display = "flex";
      weather_main.style.display = "none";
      return;
    } else {
      location_not_found.style.display = "none";
      weather_main.style.display = "flex";
    }

    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${weather_data.wind.speed} km/h`;

    switch (weather_data.weather[0].main) {
      case 'Clouds':
        weather_img.src = "asset/cloud.png";
        break;
      case 'Clear':
        weather_img.src = "asset/clear.png";
        break;
      case 'Rain':
        weather_img.src = "asset/rain.png";  // fixed
        break;
      case 'Mist':
        weather_img.src = "asset/mist.png";  // fixed
        break;
      case 'Snow':
        weather_img.src = "asset/snow.png";
        break;
      default:
        weather_img.src = "asset/clear.png";
        break;
    }
  } catch (error) {
    location_not_found.style.display = "flex";
    weather_main.style.display = "none";
    console.error("Error fetching weather data:", error);
  }
}

search.addEventListener('click', () => {
  const city = inputBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});

// Optional: Trigger search on Enter key
inputBox.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    search.click();
  }
});
