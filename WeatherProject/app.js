const express = require("express");
const https = require("https");

const app = express();

app.get("/", (req, res) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=da6f4e824572153ea32a40bdf49a684e&units=metric";
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      console.log("ORIGINAL DATA", data);
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const feelLike = weatherData.main.feels_like;

      console.log("JSON.PARSE FORMAT", weatherData);
      console.log(temp);

      const object = {
        name: "Karina",
        favoriteFood: "Alitas bbq"
      };
      console.log("JSON STRING FORMAT", JSON.stringify(object));
    });
  });

  res.send("Server is up and running.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
