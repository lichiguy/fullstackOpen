import { useEffect, useState } from "react";
import Country from "./Country";

const Results = ({ filteredCountries }) => {
  const [countriesToShow, setcountriesToShow] = useState([]);

  useEffect(() => {
    setcountriesToShow(filteredCountries)
  }, [filteredCountries])

  const selectCountry = (name) => {
    setcountriesToShow(countriesToShow.filter((country) => country.name.common === name))
  }

  if (!countriesToShow) return;
  else if (countriesToShow.length > 10) {
    return (
      <>
        <div>Too many matches, specify anothe filter</div>
      </>
    );
  } else if (countriesToShow.length > 1) {
    return (
      <>
        {countriesToShow.map((country) => (
          <div key={country.name.common}>
            {country.name.common} <button onClick={() => selectCountry(country.name.common)}>Show</button>
          </div>
        ))}
      </>
    );
  } else if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0].name.common} />;
  }
};

export default Results;
