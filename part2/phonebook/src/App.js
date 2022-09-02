import { useState, useEffect } from 'react';
import Filter from './components/Filter';

import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  const handleNewNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const found = persons.find(person => person.name === newName);
    if (found) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then(newPerson => setPersons(persons.concat(newPerson)));
    }
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>

      <Numbers filter={filter} persons={persons} />
    </div>
  );
};

export default App;
