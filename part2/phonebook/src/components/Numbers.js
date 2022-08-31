const Numbers = ({ filter, persons }) => {
  return persons
    .filter(person =>
      person.name.toLowerCase().startsWith(filter.toLowerCase())
    )
    .map(person => (
      <div key={person.name}>
        {person.name} {person.number}
      </div>
    ));
};

export default Numbers;
