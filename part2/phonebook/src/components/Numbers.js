import '../styles/Numbers.css';

const Numbers = ({ filter, persons, handleDelete }) => {
  return persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => (
      <div key={person.name} className="grid-numbers">
        <div>{person.name}</div> <div>{person.number}</div>
        <div>
          <button
            className="delete-button"
            onClick={() => {
              if (window.confirm(`Delete ${person.name}?`)) {
                handleDelete(person.id);
              }
            }}
          >
            delete
          </button>
        </div>
      </div>
    ));
};

export default Numbers;
