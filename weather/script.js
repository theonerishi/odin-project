document.addEventListener("DOMContentLoaded", () => {
  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = "Enter a location";
  input.style.width = "300px";
  input.style.marginRight = "8px";
  document.body.appendChild(input);

  const button = document.createElement("button");
  button.textContent = "Search";
  button.addEventListener("click", () => {
    const location = input.value.trim() || "London";
    renderWeather(location);
  });
  document.body.appendChild(button);

  renderWeather("London");
});

function renderWeather(location) {
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=us&key=JE5K4YRNM2GMRVGRDJ4D3HKEM&contentType=json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const section = document.createElement("section");
      section.className = "weather-section";

      const heading = document.createElement("h2");
      heading.textContent = `Weather in ${location}`;
      section.appendChild(heading);

      

      data.days.forEach((day) => {
        const tempC = ((day.temp - 32) * 5 / 9).toFixed(2);
        const container = document.createElement("div");
        container.className = "weather-row";
       
        const label = document.createElement("p");
        label.textContent = `${day.datetime}: ${tempC} °C`;
        label.className = "weather-label";
        const axisContainer = document.createElement("div");
        axisContainer.className = "axis-labels";
        axisContainer.style.display = "flex";
        for (let i = 0; i < 10; i++) {
            const numberDiv = document.createElement("span");
            numberDiv.className = "axis-label";
            numberDiv.textContent = `${4 * i}°`;
            numberDiv.style.width = "40px";
            axisContainer.appendChild(numberDiv);
        }
        container.appendChild(axisContainer);
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.width = `${Math.max(10, Number(tempC) * 10)}px`;
        bar.style.height = "20px";
        bar.style.borderRadius = "10px";

        const n = Number(tempC) * 6;
        const red = Math.max(0, Math.min(255, n));
        const blue = Math.max(0, Math.min(255, 255 - n));
        bar.style.backgroundColor = `rgb(${red}, 100, ${blue})`;

        container.appendChild(label);
        container.appendChild(bar);
        section.appendChild(container);
      });

      document.body.appendChild(section);
    })
    .catch((err) => {
      console.error(err);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Weather data could not be loaded.";
      errorMessage.className = "weather-error";
      document.body.appendChild(errorMessage);
    });
}