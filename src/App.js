import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const api = {
    url: "https://api.openweathermap.org/data/2.5/weather",
    APIKey: "9fa72ffff52ee383d3eeb0ebd299d4f8",
  };
  const [inputCity, setInputCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherInfor, setWeatherInfor] = useState("");

  const handleInputCity = (e) => {
    setInputCity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(inputCity);
  };

  useEffect(() => {
    if (!searchCity) return;
    // console.log("searching");
    const fetchWeatherData = async () => {
      try {
        const url = `${api.url}?q=${searchCity}&appid=${api.APIKey}`;
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setErrorMessage("");
          setWeatherInfor(
            `City: ${data.name}. Temperature: ${data.main.temp} F. ${data.weather[0].main}. Wind speed: ${data.wind.speed}`
          );
          setLoading(false);
        } else {
          setErrorMessage("City not found");
          setLoading(false);
        }
      } catch (error) {
        setErrorMessage(`${error.message}, please check your url`); //failed to fetch
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [searchCity, api.APIKey, api.url]);

  return (
    <div className="container">
      <form action="#" onSubmit={handleSubmit}>
        <input
          type="text"
          name="q"
          id="city-name"
          placeholder="City"
          value={inputCity}
          onChange={handleInputCity}
        />
        <button>Search</button>
      </form>
      <div>{loading}</div>
      {errorMessage ? (
        <div style={{ color: "red" }}>{errorMessage}</div>
      ) : (
        <div>{weatherInfor}</div>
      )}
    </div>
  );
}

export default App;
