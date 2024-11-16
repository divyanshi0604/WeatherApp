<script>
    const ApiKey = "430fe3d66c825725ca167635469b6edd"; // Consider hiding this
    const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    function displayDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        document.querySelector('.date').innerHTML = dateString;
    }

    function displayTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.querySelector('.time').innerHTML = timeString; 
    }

    async function fetchWeather(city) {
        if (!city) {
            document.querySelector(".error").innerText = "Please enter a city name.";
            document.querySelector(".error").style.display = "block";
            return; // Exit the function early
        }

        const response = await fetch(ApiUrl + city + `&appid=${ApiKey}`);
        if (response.ok) { // Check if the response status is 2xx
            const data = await response.json();
            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

            displayDate();
            displayTime(); 

            // Weather conditions
            const weatherCondition = data.weather[0].main;
            weatherIcon.src = `images/${weatherCondition.toLowerCase()}.png`; // Simplified image path assignment

            document.querySelector(".Weather").style.display = "block";
            document.querySelector(".error").style.display = "none"; // Hide error message
        } else {
            document.querySelector(".error").innerText = "Could not fetch weather data. Please try again later.";
            document.querySelector(".error").style.display = "block";
            document.querySelector(".Weather").style.display = "none"; // Hide weather info
        }
    }

    searchBtn.addEventListener("click", () => {
        const city = searchBox.value.trim(); // Trim whitespace
        fetchWeather(city);
    });

    // Optional: Update time every minute
    setInterval(displayTime, 60000);
    displayTime(); // Call initially
</script>
