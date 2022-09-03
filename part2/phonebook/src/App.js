import { useState, useEffect } from 'react';
import Filter from './components/Filter';

import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({
    type: '',
    content: null,
  });

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

  const handleDelete = id => {
    const backupPerson = persons.find(p => p.id === id);
    personService
      .remove(id)
      .catch(() => {
        setMessage({
          type: 'error',
          content: `Information of ${backupPerson.name} has already been removed from server`,
        });
        setTimeout(() => {
          setMessage({ type: '', content: null });
        }, 5000);
      })
      .then(() => setPersons(persons.filter(p => p.id !== id)));
  };

  const handleSubmit = event => {
    event.preventDefault();
    personService.getAll().then(response => {
      setPersons(response);

      const personAlreadyInPhonebook = response.find(
        person => person.name === newName
      );
      if (personAlreadyInPhonebook) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          personService
            .update(personAlreadyInPhonebook.id, {
              ...personAlreadyInPhonebook,
              number: newNumber,
            })
            .then(updatedPerson => {
              setPersons(
                response.map(p =>
                  p.id !== updatedPerson.id ? p : updatedPerson
                )
              );

              setMessage({
                type: 'success',
                content: `Changed ${updatedPerson.name}`,
              });
              setTimeout(() => {
                setMessage({ type: '', content: null });
              }, 5000);
            });
        }
      } else {
        personService
          .create({ name: newName, number: newNumber })
          .then(newPerson => {
            setPersons(persons.concat(newPerson));
            setMessage({ type: 'success', content: `Added ${newName}` });
            setTimeout(() => {
              setMessage({ type: '', content: null });
            }, 5000);
          });
      }
      setNewName('');
      setNewNumber('');
    });
  };

  return (
    <div>
      <Notification type={message.type} message={message.content} />
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>Add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>

      <Numbers filter={filter} persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
