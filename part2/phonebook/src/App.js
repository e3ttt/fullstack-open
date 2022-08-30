import { useState } from 'react';

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

  const handleNewNumber = event => {
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

      <div>
        filter shown with <input value={filter} onChange={handleFilter} />
      </div>

      <form onSubmit={handleSubmit}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons
        .filter(person =>
          person.name.toLowerCase().startsWith(filter.toLowerCase())
        )
        .map(person => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
};

export default App;
