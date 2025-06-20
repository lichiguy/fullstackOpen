import axios from "axios";
import { useEffect, useState } from "react";
import Language from "./Language";
import Weather from "./Weather";

const Country = ({ country }) => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    if (country) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then((response) => setCountryData(response.data));
    }
  }, [country]);

  if (countryData) {
    const { name, capital, area, flag } = countryData;
    const languages = countryData.languages;
    return (
      <>
        <h1>{name.common}</h1>
        <div>Capital: {capital}</div>
        <div>Area: {area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.entries(languages).map(([code, name]) => (
            <Language key={code} language={name} />
          ))}
        </ul>
        <div className="flag">{flag}</div>
        <Weather capital={capital}/>
      </>
    );
  } else {
    return <div>Fetching data</div>;
  }
};

export default Country;
