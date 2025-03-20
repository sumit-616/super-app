import React from "react";
import { useState, useEffect } from "react";
import pressure_icon from "/card_img/pressure_icon.png";
import humid_icon from "/card_img/Humid_icon2.png";
import wind_icon from "/card_img/wind_icon.png";
import Line from "/card_img/Line.png";
import { div } from "framer-motion/client";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  async function getWeather() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.weatherapi.com/v1/current.json?key=0986a24c86fe490aa66111209252002&q=${lat},${lon}&aqi=yes`;

            try {
              const res = await fetch(url);
              const data = await res.json();
              resolve(data);
            } catch (error) {
              reject("Error fetching weather data: " + error);
            }
          },
          (error) => {
            reject("Geolocation error: " + error.message);
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  }

  useEffect(() => {
    getWeather()
      .then((res) => {
        setWeather(res.current); // Set only the current weather data
      })
      .catch((err) => console.error("Weather API Fetch Error:", err));
  }, []);

  return (
    <div>
      {weather ? (
        <div className="grid grid-cols-8 gap-1">
          <div className="flex flex-col col-span-2 items-center">
            <img
              className="w-14 h-12"
              src={weather.condition.icon}
              alt="weather-icon"
            />
            <p>{weather.condition.text}</p>
          </div>

          <div className="flex flex-col items-center col-span-3">
            <p className="text-[1.8rem] leading-tight">{weather.temp_c}°C</p>
            <div className="flex items-center gap-2 flex-wrap">
              <img src={pressure_icon} alt="Pressure Icon" />
              <p className="leading-tight text-sm">
                {weather.pressure_mb} mb <br /> Pressure
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center col-span-3">
            <div className="flex items-center gap-2 flex-wrap">
              <img src={wind_icon} alt="Wind Icon" />
              <p className="leading-tight text-sm">
                {weather.wind_kph} km/h <br /> Wind
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <img className="w-4 h-5" src={humid_icon} alt="Humidity Icon" />
              <p className="text-sm">
                {weather.humidity}% <br /> Humidity
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="h-32 text-2xl font-semibold py-4 px-6">Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;
