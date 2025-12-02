import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherForm = () => {
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const fetchWeather = () => {
    axios
  .get(`http://127.0.0.1:5000/get_weather?lat=${lat}&lon=${lon}`)
      .then((res) => setWeather(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLat(latitude);
      setLon(longitude);
    });
  }, []);

  useEffect(() => {
    if (lat && lon) fetchWeather();
  }, [lat, lon]);

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-xl font-bold mb-2">🌦️ Weather Info</h2>
      {weather ? (
        <div>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Humidity: {weather.humidity} %</p>
          <p>Rainfall: {weather.rainfall} mm</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherForm;
