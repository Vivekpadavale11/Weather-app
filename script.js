const apiKey = "6640dee2b16d760c931aa2d40fcca427";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to fetch and display weather
async function checkWeather(city) {
  if (!city) return;

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    alert("City not found. Please enter a valid city name.");
    return;
  }

  const data = await response.json();

  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + " km/h";

  // Update weather icon
  const weather = data.weather[0].main;
  if (weather === "Clouds") weatherIcon.src = "images/clouds.png";
  else if (weather === "Clear") weatherIcon.src = "images/clear.png";
  else if (weather === "Rain") weatherIcon.src = "images/rain.png";
  else if (weather === "Drizzle") weatherIcon.src = "images/drizzle.png";
  else if (weather === "Mist") weatherIcon.src = "images/mist.png";
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Optional: search when pressing Enter key
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
