import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  /* Function that adds a name in the persons list. */
  const addName = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ name: newName }))
    setNewName('');
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
      {persons.map((person) => {
        return (
          <p key={person.name}>{person.name}</p>
        )
      })
      }
    </div>
  )
}

export default App