import { useState, useEffect } from 'react'
import personsService from './Services/persons.js'
import Filter from './Filter/Filter.jsx'
import PersonForm from './PersonForm/PersonForm.jsx'
import Persons from './Persons/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

  /* Filter the person list by name using the search input field. */
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))

  /* Function that adds a name in the persons list. */
  const addName = (event) => {
    event.preventDefault()

    /* Checking if name exists in the list, if it doesnt find return undefined. */
    const nameExists = persons.find((person) => JSON.stringify(person.name) === JSON.stringify(newName))

    if (nameExists === undefined) {// if the name doesnt exist,
      personsService
        .createEntry({ name: newName, number: newPhoneNumber, id: persons.slice(-1)[0].id + 1 })
        .then(response => {
          setPersons(persons.concat(response)) // adds it to the phonebook.
        })
    }
    else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) { // asks the user to replace the number.
      const personWithNewNumber = { ...nameExists, number: newPhoneNumber }
      personsService
        .updateEntry(personWithNewNumber.id, personWithNewNumber)
        .then(response => {
          setPersons(persons.map(person => (person.id !== personWithNewNumber.id) ? person : response))
        })
    }
    setNewName('') // Clears the input field.
    setNewPhoneNumber('') // Clears the input field.

  }

  /* Function that handles the changes in the name input field. */
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  /* Function that handles the changes in the phone input field. */
  const handlePhoneChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  /* Function that handles the changes in the search input field. */
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  /* Function that handles the deletion of an entry of the phonebook. */
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .deleteEntry(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  useEffect(() => {
    personsService
      .getAllEntries()
      .then(response => {
        setPersons(response)
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])


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
      <Persons Persons={filteredPersons} HandleDelete={handleDelete} />
    </div>
  )
}

export default App