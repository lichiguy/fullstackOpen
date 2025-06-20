import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, seterrorMessage] = useState(null);
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const deletePersonFromAgenda = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((n) => n.id !== person.id));
      });
    }
  };

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };

        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            setSuccess(false)
            seterrorMessage(
              `Information of ${newName} has already been removed form the server`
            );
            setTimeout(() => {
              seterrorMessage(null);
            }, 5000);
            setPersons(persons.filter((n) => n.name !== newName));
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }

    setSuccess(true)
    seterrorMessage(`Added ${personObject.name}`);
    setTimeout(() => {
      seterrorMessage(null);
    }, 2000);
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} errorType={success} />
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        deletePersonFromAgenda={deletePersonFromAgenda}
      />
    </div>
  );
};

export default App;
