const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random";

async function getWeather(city = "New York") {
  const res = await fetch(
    `${WEATHER_API_URL}?q=${city.replace(/ /g, '+')}&appid=${CONFIG.OPENWEATHER_API_KEY}&units=imperial`
  );
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
}

async function getUnsplashPhoto(query) {
  const res = await fetch(
    `${UNSPLASH_API_URL}?query=${query}&client_id=${CONFIG.UNSPLASH_ACCESS_KEY}`
  );
  if (!res.ok) throw new Error("Unsplash fetch failed");
  return res.json();
}

function getWeatherKeyword(weatherMain) {
  const map = {
    Clear: "sunny",
    Clouds: "cloudy",
    Rain: "rain",
    Drizzle: "drizzle",
    Thunderstorm: "thunderstorm",
    Snow: "snow",
    Mist: "mist",
    Fog: "fog",
  };
  return map[weatherMain] || "nature";
}

async function loadCity(city) {
  document.getElementById("weather-description").textContent = "Loading...";
  document.getElementById("weather-temp").textContent = "";

  try {
    const weather = await getWeather(city);

    const weatherMain = weather.weather[0].main;
    const description = weather.weather[0].description;
    const temp = Math.round(weather.main.temp);
    const cityName = weather.name;

    document.getElementById("weather-description").textContent =
      description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById("weather-temp").textContent = `${temp}°F — ${cityName}`;

    document.body.className = `weather-${weatherMain.toLowerCase()}`;

    const keyword = getWeatherKeyword(weatherMain);
    const photo = await getUnsplashPhoto(keyword);

    const img = document.getElementById("unsplash-image");
    img.src = photo.urls.regular;
    img.alt = photo.alt_description || keyword;

    const credit = document.getElementById("unsplash-credit");
    credit.textContent = `Photo by ${photo.user.name} on Unsplash`;
  } catch (err) {
    console.error(err);
    document.getElementById("weather-description").textContent =
      "City not found. Please try another.";
    document.getElementById("weather-temp").textContent = "";
  }
}

document.getElementById("city-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("city-input").value.trim();
  if (input) {
    setActiveButton(null);
    loadCity(input);
  }
});

document.querySelectorAll(".city-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("city-input").value = "";
    setActiveButton(btn);
    loadCity(btn.dataset.city);
  });
});

function setActiveButton(activeBtn) {
  document.querySelectorAll(".city-btn").forEach((btn) => {
    btn.classList.toggle("active", btn === activeBtn);
  });
}

const defaultBtn = document.querySelector('.city-btn[data-city="New York,US"]');
setActiveButton(defaultBtn);
loadCity("New York,US");
