
let cities = [];

getHistory();

function storeHistory() {
    localStorage.setItem("cities", JSON.stringify(cities))
    console.log(cities)
}

function getHistory() {
    let savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities !== null) {
        cities = savedCities
    }
    historyButton();
}

function historyButton() {
    for (let i = 0; i < cities.length; i++) {
        let historyB = $("<button>").attr("class", "list-group-item")
        historyB.text(cities[i])
        $(".history").append(historyB)
    }
}



$("button").on("click", function (event) {
    event.preventDefault();
    let cityWeather = $("input").val().trim()
    cities.push(cityWeather)
    if(cities.length > 8) {
        cities.shift();
    }
    let api_key = "fe4a853726c79035bac73e26c523869e";
    let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityWeather + "&appid=" + api_key
    let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityWeather + "&appid=" + api_key
    storeHistory();
    historyButton();

    $.ajax({
        url: queryURL1,
        method: "GET"
    })

        .then(function (response) {
            console.log(response);
            $("#cityName").text(response.name)

            let tempF = (response.main.temp - 273.15) * 1.80 + 32
            $("#temp").text("Temperature: " + Math.floor(tempF) + " °F")

            $("#humidity").text("Humidity: " + response.main.humidity + "%")

            $("#wind").text("Wind speed: " + response.wind.speed + " MPH")
        });
    $.ajax({
        url: queryURL2,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            let newrow = $("<div>").attr("class", "forecast");
            $("#futureForecast").append(newrow);

            for (let i = 0; i < response.list.length; i++) {
                if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    let newCol = $("<div>").attr("class", "one-fifth");
                    newrow.append(newCol);

                    let newCard = $("<div>").attr("class", "card text-white bg-primary");
                    newCol.append(newCard);

                    let cardImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
                    newCard.append(cardImg);

                    let bodyDiv = $("<div>").attr("class", "card-body");
                    newCard.append(bodyDiv);

                    let tempF = Math.floor((response.list[i].main.temp - 273.15) * 1.80 + 32)
                    bodyDiv.append($("<p>").attr("class", "card-text").text("Temp: " + tempF + " °F"));
                    bodyDiv.append($("<p>").attr("class", "card-text").text("Humidity: " + response.list[i].main.humidity + "%"));
                    bodyDiv.append($("<p>").attr("class", "card-text").text("wind: " + response.list[i].wind.speed + " MPH"));
                }
            }
        });

});