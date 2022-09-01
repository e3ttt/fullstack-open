import { useState } from 'react';

const CountryInfo = ({ country }) => {
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
