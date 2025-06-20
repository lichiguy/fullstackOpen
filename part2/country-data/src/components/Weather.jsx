import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ capital }) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [countryWeather, setcountryWeather] = useState(null);

  useEffect(() => {
    if (capital) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
        )
        .then((response) => setcountryWeather(response.data));
    }
  }, [capital, apiKey]);

  if (countryWeather) {
    const mainData = countryWeather.main;
    const windData = countryWeather.wind;
    const iconId = countryWeather.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`

    return (
      <>
        <h2>Weather in {capital}</h2>
        <div>Temperature: {mainData.temp} Celsius</div>
        <img src={iconUrl} alt="" />
        <div>Wind: {windData.speed} m/s</div>
      </>
    );
  } else {
    return <div>Fetching data</div>;
  }
};

export default Weather;
