const Numbers = ({ filter, persons, handleDelete }) => {
  return persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => (
      <div key={person.name}>
        {person.name} {person.number}{' '}
        <button
          onClick={() => {
            if (window.confirm(`Delete ${person.name}?`)) {
              handleDelete(person.id);
            }
          }}
        >
          delete
        </button>
      </div>
    ));
};

export default Numbers;
