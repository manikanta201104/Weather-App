document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "02c0d536b5796c19f061f62b95916d6d"; // Note: API key obtained from OpenWeatherMap after signing in. Ensure it is stored securely.
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // Base URL for OpenWeatherMap API without the city name and API key.

    const searchBox = document.querySelector(".search-container input"); // Selects the search input box.
    const searchBtn = document.querySelector("#search"); // Selects the search button.
    const weatherIcon = document.querySelector(".weather-icon"); // Selects the weather icon element.

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + "&appid=" + apiKey); // Sends a request to the OpenWeatherMap API with the specified city and API key.
            const data = await response.json();
            console.log( data);
            if (response.ok) {
                // Updates weather details in the HTML
                document.querySelector(".city").innerHTML = data.name; // Displays the city name from the API response.
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; // Displays the temperature in Celsius.
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Displays the humidity percentage.
                document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"; // Displays the wind speed in km/h.

                // Sets the appropriate weather icon based on the weather condition.
                switch (data.weather[0].main) {
                    case "Clouds":
                        weatherIcon.src = "clouds.png";
                        break;
                    case "Clear":
                        weatherIcon.src = "clear.png";
                        break;
                    case "Drizzle":
                        weatherIcon.src = "drizzle.png";
                        break;
                    case "Rain":
                        weatherIcon.src = "rain.png";
                        break;
                    case "Mist":
                        weatherIcon.src = "mist.png";
                        break;
                    default:
                        weatherIcon.src = "snow.png"; // Default to snow.png if the weather condition is not listed.
                        break;
                }

                // Displays the weather and details sections.
                document.querySelector(".weather").style.display = "block"; // Shows the weather section.
                document.querySelector(".details").style.display = "flex"; // Shows the details section.
            } else {
                alert("City not found. Please try again."); // Alerts the user if the city is not found.
            }
        } catch (error) {
            console.error("Error fetching weather data:", error); // Logs any errors to the console.
            alert("Failed to fetch weather data. Please try again."); // Alerts the user if there is an error fetching data.
        }
    }

    // Adds an event listener to the search button to trigger the checkWeather function when clicked.
    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value); // Calls checkWeather with the value from the search box input.
    });
});
