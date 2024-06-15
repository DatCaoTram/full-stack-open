const PersonForm = ({
  handleNameChange, 
  handleNumberChange, 
  addNewPerson
  }) => {
  return(
    <form onSubmit={addNewPerson}>
      <div>
        name: <input onChange={handleNameChange}/>
      </div>
      <div>
        number: <input onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm