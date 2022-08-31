import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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
      setPersons(persons.concat({ name: newName, number: newNumber }));
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
