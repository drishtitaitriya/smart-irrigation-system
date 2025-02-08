const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Replace "your_api_key" with your actual OpenWeatherMap API key
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather";

// ✅ Function to fetch weather data
async function getWeather(city) {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
         q: city, 
         appid: WEATHER_API_KEY, 
         units: "metric" },
    });

    return {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      rainfall: response.data.rain?.["1h"] || 0, // Rainfall in last 1 hour
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

// ✅ API Route: Get Smart Irrigation Recommendation
app.get("/irrigation", async (req, res) => {
  const city = req.query.city || "Delhi"; // Default to Delhi
  const weather = await getWeather(city);

  if (!weather) {
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }

  let irrigationAdvice = "No irrigation needed";

  if (weather.rainfall > 5) {
    irrigationAdvice = "No irrigation needed (Rain detected)";
  } else if (weather.temperature > 30 && weather.humidity < 40) {
    irrigationAdvice = "Irrigate frequently (Hot & Dry Weather)";
  } else if (weather.temperature < 20 && weather.humidity > 70) {
    irrigationAdvice = "Minimal irrigation needed (Cool & Humid Weather)";
  } else {
    irrigationAdvice = "Irrigate normally";
  }

  res.json({
    city,
    temperature: weather.temperature,
    humidity: weather.humidity,
    rainfall: weather.rainfall,
    recommendation: irrigationAdvice,
  });
});

// ✅ Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));