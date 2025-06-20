const Persons = ({ personsToShow, deletePersonFromAgenda }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePersonFromAgenda(person)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
