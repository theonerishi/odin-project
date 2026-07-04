document.addEventListener("DOMContentLoaded", () => {
  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = "Enter a location";
  input.style.width = "300px";
  input.style.marginRight = "8px"; // text input box for location
  document.body.appendChild(input);

  const button = document.createElement("button");
  button.textContent = "Search";
  button.addEventListener("click", () => {
    const location = input.value.trim() || "London";
    renderWeather(location); // updates location and renders weather
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      button.click();
    }
  });
  document.body.appendChild(button);

  renderWeather("London");
});

async function renderWeather(location) {
  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&format=json`
    );

    if (!geoResponse.ok) {
      throw new Error(`Geocoding request failed with status ${geoResponse.status}`);
    } // fetch request and catch for error

    const geoData = await geoResponse.json();
    const result = geoData.results?.[0]; // first result of geodata with optional chaining in case the variable is undefined

    if (!result) {
      throw new Error("Location not found.");
    } // error catch if location not found

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&daily=temperature_2m_mean&current=temperature_2m&timezone=auto&forecast_days=5`
    ); // searches for weather information in the location selected

    if (!weatherResponse.ok) {
      throw new Error(`Weather request failed with status ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();
    const temps = weatherData.daily?.temperature_2m_mean || []; // get average temperature 2m above ground
    const minTemp = Math.min(...temps, 0);
    const maxTemp = Math.max(...temps, 1); // makes sure that scale includes zero
    const tempSteps = 5;
    const stepSize = (maxTemp - minTemp) / tempSteps; // after every stepsize pixels print an axis label

    const section = document.createElement("section");
    section.className = "weather-section";

    const heading = document.createElement("h2");
    heading.textContent = `Weather in ${result.name}, ${result.country}`;
    section.appendChild(heading); // render header

    const axisContainer = document.createElement("div");
    axisContainer.className = "axis-labels";
    axisContainer.style.display = "flex";
    for (let i = 0; i <= tempSteps; i++) {
      const value = Math.round(minTemp + stepSize * i);
      const numberDiv = document.createElement("span");
      numberDiv.className = "axis-label";
      numberDiv.textContent = `${value}°`;
      numberDiv.style.width = "40px";
      axisContainer.appendChild(numberDiv);
    } // label every step in the temperature range
    section.appendChild(axisContainer);

    weatherData.daily.time.forEach((day, index) => {
      const tempC = temps[index];
      const container = document.createElement("div");
      container.className = "weather-row"; // get value from array

      const label = document.createElement("p");
      label.textContent = `${day}: ${tempC} °C`;
      label.className = "weather-label"; // print date and temperature

      const bar = document.createElement("div");
      bar.classList.add("bar");
      const barWidth = tempC * 10;
      bar.style.width = `${barWidth}px`; // set bar width 1 C every ten pixels
      bar.style.height = "20px";
      bar.style.borderRadius = "10px";

      let color = "#60a5fa";
      if (tempC >= 25) {
        color = "#ef4444";
      } else if (tempC >= 15) {
        color = "#f59e0b";
      } else if (tempC >= 10) {
        color = "#3b82f6";
      }
      bar.style.backgroundColor = color; // color scale

      container.appendChild(label);
      container.appendChild(bar);
      section.appendChild(container);
    });

    document.body.appendChild(section);
  } catch (err) {
    console.error(err);
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Weather data could not be loaded.";
    errorMessage.className = "weather-error";
    document.body.appendChild(errorMessage);
  }
}