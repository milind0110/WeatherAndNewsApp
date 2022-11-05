const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",(req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.post("/",(req, res) => {
    const cityName = req.body.CityName;
    const apiKey = "0663772a225559fe79f4f6478a1fc9e3";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, (response) => {

        response.on("data", function(Data){
            const weatherData = JSON.parse(Data);
            const temperature = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>";
            console.log(iconUrl);
            const weatherDescription = "<h1>The weather today is " + weatherData.weather[0].description + "</h1>";
            res.write(weatherDescription);
            res.write("<h1>The temperature in " + cityName +  " is " + temperature + " degree Celcius</h1>");
            res.write(iconUrl);
            res.send();
        });

    });
});

app.listen(3000,() => {
    console.log("Listening to port 3000");
});