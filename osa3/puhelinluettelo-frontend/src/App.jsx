import { useState, useEffect } from 'react'
import bookService from "./bookService"
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [nameFilter, setFilter] = useState('')
  const [msg, setMsg] = useState({text: null, state: null})
  const notify = (text, state) => {
    setMsg({text, state})
    setTimeout(() => {
      setMsg({text: null, state: null})
    }, "2000");
  }
  const addNewPerson = (event) => {
    event.preventDefault() 
    const existingPerson = persons.find(person => person.name === newName)
    const existingPersonIndex = persons.findIndex(person => person.name === newName)

    if (newName.trim() === "" || newNumber.trim() === "") {
      notify(`Name or number is missing`, false)
    }
    else if (existingPerson !== undefined) {
      // Existing person
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        /* Deep copy with structuredClone, only 
        available in newer browsers (baseline 2022) */
        const updatePersons = structuredClone(persons) 
        updatePersons[existingPersonIndex].number = newNumber
        setPersons(updatePersons)
        notify(`Number changed for ${newName}`, true)
        bookService.update({name: newName, number: newNumber, id: existingPerson.id})
      } 
    } else {
      // Entirely new person
      const newPerson = { 
        name: newName, 
        number: newNumber, 
      }
      notify(`Added ${newPerson.name}`, true)
      bookService.create(newPerson)   
      .then(data => setPersons(persons.concat(data)))
    }
  }
  const removePerson = personId => {
    const removePerson = persons.find(person => person.id === personId)
    if (window.confirm(`Delete ${removePerson.name} ?`)) {
      const newPersons = persons.filter(person => person.id !== personId)
      setPersons(newPersons)
      notify(`Removed ${removePerson.name}`, true)
      bookService.remove(personId)
      .then(() => console.log("removal succesful"))
      .catch(() => notify(`Information of ${removePerson.name} has already been removed from server`))
    }
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
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
      <Notification msg={msg}/>
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