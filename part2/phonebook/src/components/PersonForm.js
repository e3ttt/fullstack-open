import '../styles/PersonForm.css';
const PersonForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="grid">
        <div>Name:</div>
        <div>
          <input value={props.newName} onChange={props.handleNewNameChange} />
        </div>
        <div>Number:</div>
        <div>
          <input
            value={props.newNumber}
            onChange={props.handleNewNumberChange}
          />
        </div>
      </div>
      <div></div>
      <div>
        <button type="submit" className="add-button">
          Add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
