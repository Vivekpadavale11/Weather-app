const apiKey = "6640dee2b16d760c931aa2d40fcca427"; // Replace with your OpenWeatherMap API key

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") return alert("Please enter a city name.");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const feels = Math.round(data.main.feels_like);
    const cityName = `${data.name}, ${data.sys.country}`;

    // Display data
    document.getElementById("temperature").innerText = `${temperature}°C`;
    document.getElementById("description").innerText = description;
    document.getElementById("humidity").innerText = `${humidity}%`;
    document.getElementById("wind").innerText = `${wind} km/h`;
    document.getElementById("feels").innerText = `${feels}°C`;
    document.getElementById("cityName").innerText = cityName;

    // Update weather icon
    const weatherIcon = document.getElementById("weatherIcon");
    if (description.includes("cloud")) {
      weatherIcon.className = "fas fa-cloud";
    } else if (description.includes("rain")) {
      weatherIcon.className = "fas fa-cloud-showers-heavy";
    } else if (description.includes("clear")) {
      weatherIcon.className = "fas fa-sun";
    } else if (description.includes("snow")) {
      weatherIcon.className = "fas fa-snowflake";
    } else {
      weatherIcon.className = "fas fa-smog";
    }

    // Update background image based on temperature & condition
    updateBackground(temperature, description);

  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Function to change background image dynamically
function updateBackground(temp, description) {
  const background = document.getElementById("background");

  if (description.toLowerCase().includes("rain")) {
    background.style.backgroundImage = "url('images/rain.png')";
  } else if (temp < 20) {
    background.style.backgroundImage = "url('images/winter.png')";
  } else if (temp >= 20 && temp <= 30) {
    background.style.backgroundImage = "url('images/pleasant.png')";
  } else if (temp > 30) {
    background.style.backgroundImage = "url('images/summer.png')";
  }

  background.style.backgroundSize = "cover";
  background.style.backgroundPosition = "center";
  background.style.transition = "background-image 1s ease-in-out";
}
