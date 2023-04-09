require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const getWeather = async(cityName) =>{
  const apiOne = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a0bc5669a86075a0486caf026d49a8c9&units=metric`
  try {
      const repo = await axios.get(apiOne)
      return repo.data
  } catch (error) {
    console.log(error)
  }
}


app.get("/", (req, res) => {
  const data = getWeather('rishra')
  data.then((response)=>{
    const data = {
            temp: response.main.temp,
            location: response.name,
            description: response.weather[0].description,
            humidity: response.main.humidity,
            wind: response.wind.speed,
          };
    res.render("index", {data: data});
  })
});

app.post("/", async (req, res) => {
  const data = getWeather(req.body.cityName)
  data.then((response)=>{
    const data = {
            temp: response.main.temp,
            location: response.name,
            description: response.weather[0].description,
            humidity: response.main.humidity,
            wind: response.wind.speed,
          };
    res.render("index", {data: data});
  })
});

app.listen(process.env.PORT, () => console.log("Running"));
