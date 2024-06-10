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

export default Persons
