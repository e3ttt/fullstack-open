import { useEffect, useState } from 'react';
import axios from 'axios';

const Countries = props => {
  const length = props.countries.length;
  if (props.filter != '') {
    if (length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (length > 1) {
      return props.countries.map((country, index) => (
        <div key={index}>{country.name.common}</div>
      ));
    } else if (length === 1) {
      const country = props.countries[0];
      console.log(console.log(country));
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

          <img style={{ border: '1px solid #ccc' }} src={country.flags.png} />
        </div>
      );
    } else {
      return <div>No country found</div>;
    }
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div>
        find countries:{' '}
        <input
          value={filter}
          onChange={event => setFilter(event.target.value)}
        />
      </div>

      <Countries filter={filter} countries={filteredCountries} />
    </div>
  );
};

export default App;
