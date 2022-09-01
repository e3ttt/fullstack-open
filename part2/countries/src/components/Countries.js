import { useEffect, useState } from 'react';
import axios from 'axios';

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState({ temp: 0, wind: 0, icon: '' });

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`
      )
      .then(response => {
        setWeather({
          temp: Math.round(response.data.main.temp),
          wind: Math.round(3.6 * response.data.wind.speed),
          icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        });
      });
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        style={{ border: '1px solid #ccc' }}
        src={country.flags.png}
        alt="Country flag"
      />

      <h3>weather in {country.name.common}</h3>
      <div>temperature {weather.temp} ºC</div>
      <div>
        <img src={weather.icon} alt="Weather icon" />
      </div>
      <div>wind {weather.wind} km/h</div>
    </div>
  );
};

const Countries = ({ countries, filter, showInfo, handleShowInfo }) => {
  const length = countries.length;

  if (filter !== '') {
    if (length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (length > 1) {
      return countries.map((country, index) => (
        <div key={index}>
          {country.name.common}{' '}
          <button onClick={() => handleShowInfo(index)}>show</button>
          {showInfo[index] && <CountryInfo country={country} />}
        </div>
      ));
    } else if (length === 1) {
      const country = countries[0];
      return <CountryInfo country={country} />;
    } else {
      return <div>No country found</div>;
    }
  }
};

export default Countries;
