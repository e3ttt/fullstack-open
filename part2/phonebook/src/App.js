import { useState, useEffect } from 'react';
import Filter from './components/Filter';

import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';
import Notification from './components/Notification';
import peopleService from './services/people';

const App = () => {
  const [people, setPeople] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({
    type: '',
    content: null,
  });

  useEffect(() => {
    peopleService.getAll().then(initialpeople => setPeople(initialpeople));
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
    const backupPerson = people.find(p => p.id === id);
    peopleService
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
      .then(() => setPeople(people.filter(p => p.id !== id)));
  };

  const handleSubmit = event => {
    event.preventDefault();
    peopleService.getAll().then(response => {
      setPeople(response);

      const personAlreadyInPhonebook = response.find(
        person => person.name === newName
      );
      if (personAlreadyInPhonebook) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          peopleService
            .update(personAlreadyInPhonebook.id, {
              ...personAlreadyInPhonebook,
              number: newNumber,
            })
            .then(updatedPerson => {
              setPeople(
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
        peopleService
          .create({ name: newName, number: newNumber })
          .then(newPerson => {
            setPeople(people.concat(newPerson));
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

      <Numbers filter={filter} people={people} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
