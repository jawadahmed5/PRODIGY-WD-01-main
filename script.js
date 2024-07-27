document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value;
  const apiKey = "703992e8e01e74b73e2283fd65552ffa";
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(currentWeatherUrl)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.cod === 200) {
        document.getElementById("cityName").innerHTML = data.name;
        document.getElementById("description").innerHTML =
          data.weather[0].description;
        document.getElementById(
          "weatherIcon"
        ).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById(
          "temperature"
        ).innerHTML = `Temp: ${data.main.temp}`;
        document.getElementById(
          "humidity"
        ).innerHTML = `Humidity: ${data.main.humidity}`;
        document.getElementById(
          "windSpeed"
        ).innerHTML = `Wind Speed: ${data.wind.speed}`;
      }
    }).catch(err=>{
        alert(err)
    });

  fetch(forecastUrl)
    .then((resp) => resp.json())
    .then((data) => {
      const forecastCards = document.getElementById("forecastCards");
      forecastCards.innerHTML = "";

      data.list.forEach((forecast, index) => {
        if (index % 8 === 0) {
          const forecastCard = document.createElement("div");
          forecastCard.classList.add("card");

          forecastCard.innerHTML = `<h3>${new Date(
            forecast.dt * 100
          ).toLocaleDateString()}</h3>
             <img src="http://openweathermap.org/img/wn/${
               forecast.weather[0].icon
             }@2x.png">
             <p>${forecast.weather[0].description}</p>
             <p>Temp: ${forecast.main.temp}</p>
             <p>Humidity: ${forecast.main.humidity}</p>`;

          forecastCards.appendChild(forecastCard);
        }
      });
    }).catch(err=>{
        alert(err)
    });
});