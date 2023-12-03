import { useState } from 'react'
import Filter from './Filter/Filter.jsx'
import PersonForm from './PersonForm/PersonForm.jsx'
import Persons from './Persons/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

  /* Function that filters entries by name depending on the search value
     and returns a new function. */
  const filterEntriesByName = () => {
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
    return filteredPersons;
  }

  /* Function that adds a name in the persons list. */
  const addName = (event) => {
    event.preventDefault()
    /* Checking if name exists in the list, 
    if it doesnt find return undefined. */
    const nameExists = persons.find((person) => JSON.stringify(person.name) === JSON.stringify(newName))

    if (nameExists === undefined) // if the name doesnt exist,
      setPersons(persons.concat({ name: newName, number: newPhoneNumber })) // adds it to the phonebook.
    else  // else, 
      alert(`${newName} is already added to phonebook`) // alerts that it already exists.

    setNewName(''); // Clears the input field.
    setNewPhoneNumber(''); // Clears the input field.

  }

  /* Function that handles the changes in the name input field. */
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  /* Function that handles the changes in the phone input field. */
  const handlePhoneChange = (event) => {
    setNewPhoneNumber(event.target.value);
  }

  /* Function that handles the changes in the search input field. */
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter Search={search} HandleSearchChange={handleSearchChange} />
      <h2>Add a new entry</h2>
      <PersonForm
        AddName={addName}
        HandleNameChange={handleNameChange}
        HandlePhoneChange={handlePhoneChange}
        NewName={newName}
        NewPhoneNumber={newPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons Filter={filterEntriesByName()} />
    </div>
  )
}

export default App