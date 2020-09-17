$("button").on("click", function (event) {
    event.preventDefault();
    let cityWeather = $("input").val().trim()
    let api_key = "fe4a853726c79035bac73e26c523869e";
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityWeather + "&appid=" + api_key


    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(queryURL);
            console.log(response);

        });
});