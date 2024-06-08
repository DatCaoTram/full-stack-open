import { useState } from 'react'

const Filter = ({ handleFilterChange }) => {
  return(
    <form>
      <p>filter shown with <input onChange={handleFilterChange}/></p> 
    </form>   
  )
}

const PersonForm = ({
  handleNameChange, 
  handleNumberChange, 
  addNewPerson
  }) => {
  return(
    <>
      <div>
        name: <input onChange={handleNameChange}/>
      </div>
      <div>
        number: <input onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit" onClick={addNewPerson}>add</button>
      </div>
    </>
  )
}

const Persons = ({ persons, nameFilter }) => {
  return(
    persons.map(person => { 
      const name = person.name.toLowerCase()
      if (name.includes(nameFilter)) {
        return <p key={person.name}>{person.name} {person.number}</p>
      }
    })
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [nameFilter, setFilter] = useState('')
  const addNewPerson = (event) => {
    event.preventDefault() 
    const isPersonAlready = persons.filter(person => person.name === newName)
    if (isPersonAlready.length) { 
      alert(`${newName} is already added to phonebook`) 
    }
    else { setPersons(persons.concat({ name: newName, number: newNumber })) }
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        addNewPerson={addNewPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter}/>
    </div>
  )
}

export default App