$("button").on("click", function (event) {
    event.preventDefault();
    let cityWeather = $("input").val().trim()
    let api_key = "fe4a853726c79035bac73e26c523869e";
    let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityWeather + "&appid=" + api_key
    let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityWeather + "&appid=" + api_key


    $.ajax({
        url: queryURL1,
        method: "GET"
    })

        .then(function (response) {
            console.log(response);
            $("#cityName").text(response.name)
            $("#temp").text("Temperature: " + response.main.temp + " degrees")
            $("#humidity").text("Humidity: " + response.main.humidity + "%")
            $("#wind").text("Wind speed: " + response.wind.speed + " MPH")
        });
    $.ajax({
        url: queryURL2,
        method: "GET"
    })

        .then(function(response) {
            console.log(response);
        });

});