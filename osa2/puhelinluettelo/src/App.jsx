import { useState, useEffect } from 'react'
import bookService from "./bookService"

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

const Persons = ({ persons, nameFilter, removePerson }) => {
  if (persons === undefined) {
    return <></>
  } else {
    return(
      persons.map(person => { 
        const name = person.name.toLowerCase()
        if (name.includes(nameFilter)) {
          return(<p key={person.name}>
                  {person.name} {person.number} 
                  <button onClick={() => removePerson(person.id)}>
                    delete
                  </button>
                </p>
          )
        }
      })
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [nameFilter, setFilter] = useState('')
  const addNewPerson = (event) => {
    event.preventDefault() 
    const existingPerson = persons.find(person => person.name === newName)
    const newPerson = { 
      name: newName, 
      number: newNumber, 
      id: existingPerson.id 
    }
    if (existingPerson.name === newName) { 
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatePersons = persons.filter(person => person.name !== newName)
        setPersons(updatePersons.concat(newPerson))
        bookService.update(newPerson)
      } 
    } else { 
      setPersons(persons.concat(newPerson)) 
      bookService.create(newPerson)
    }
  }
  const removePerson = personId => {
    const removePerson = persons.find(person => person.id === personId)
    if (window.confirm(`Delete ${removePerson.name} ?`)) {
      const newPersons = persons.filter(person => person.id !== personId)
      setPersons(newPersons)
      bookService.remove(personId)
    }
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
  useEffect(() => {
    bookService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
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
      <Persons 
        persons={persons} 
        nameFilter={nameFilter} 
        removePerson={removePerson}/>
    </div>
  )
}

export default App