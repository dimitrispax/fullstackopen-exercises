import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  /* Function that adds a name in the persons list. */
  const addName = (event) => {
    event.preventDefault()
    /* Checking if name exists in the list, if it doesnt find return undefined. */
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newPhoneNumber} onChange={handlePhoneChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person) => {
          return (
            <p key={person.name}>{person.name} {person.number}</p>
          )
        })
      }
    </div>
  )
}

export default App