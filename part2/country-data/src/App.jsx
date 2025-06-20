import { useState, useEffect } from "react";
import axios from "axios";
import Results from "./components/Results";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(null)

  useEffect(() => {
    console.log(`fetching data`);
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => setCountries(response.data));
  }, []);

  useEffect(() => {
    if(value) {
      console.log(`filter is now ${value}`)
      setFilteredCountries(countries.filter((country) => country.name.common.toLowerCase().includes(value)))
    }
  }, [value, countries])
  
  const handleCountryChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
    <div>
      find countries
      <input value={value} onChange={handleCountryChange} />
    </div>
    <Results filteredCountries={filteredCountries}/>
    </>
  );
};

export default App;
