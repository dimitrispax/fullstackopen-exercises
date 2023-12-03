import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  /* Function that adds a name in the persons list. */
  const addName = (event) => {
    event.preventDefault()
    /* Checking if name exists in the list, if it doesnt find return undefined. */
    const nameExists = persons.find((person) => JSON.stringify(person.name) === JSON.stringify(newName))

    if (nameExists === undefined) // if the name doesnt exist,
      setPersons(persons.concat({ name: newName })) // adds it to the phonebook.
    else  // else, 
      alert(`${newName} is already added to phonebook`) // alerts that it already exists.

    setNewName(''); // Clears the input field.

  }

  /* Function that handles the changes in the input field. */
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person) => {
          return (
            <p key={person.name}>{person.name}</p>
          )
        })
      }
    </div>
  )
}

export default App