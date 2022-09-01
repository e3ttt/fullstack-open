import { useEffect, useState } from 'react';
import axios from 'axios';

import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [showInfo, setShowInfo] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data);
      setShowInfo(new Array(response.data.length).fill(false));
    });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const handleShowInfo = index => {
    const copyShowInfo = [...showInfo];
    copyShowInfo[index] = !copyShowInfo[index];
    setShowInfo(copyShowInfo);
  };

  const handleChangeFilter = event => {
    setFilter(event.target.value);
    // Reset showInfo array to false
    setShowInfo(new Array(countries.length).fill(false));
  };

  return (
    <div>
      <div>
        find countries: <input value={filter} onChange={handleChangeFilter} />
      </div>

      <Countries
        filter={filter}
        countries={filteredCountries}
        showInfo={showInfo}
        handleShowInfo={handleShowInfo}
      />
    </div>
  );
};

export default App;
