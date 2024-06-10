import { useState, useEffect } from 'react'
import networkService from "./networkService"
import DisplayFullCountry from "./components/DisplayFullCountry"

function App() {
  const [countries, setCountries] = useState([])
  const [displayCountries, setDisplay] = useState([])

  const showCountry = country => {
    setDisplay([ country ])
  }
  const handleCountries = (event) => {
    const countryFilter = event.target.value.toLowerCase()
    if (countryFilter === "") {
      setDisplay([])
    } else {
      const filteredCountries = countries.filter(
        country => {
          const lowerCasedName = country.name.common.toLowerCase()
          return lowerCasedName.includes(countryFilter)
      })
      setDisplay(filteredCountries)
    }
  }
  useEffect(() => {
    networkService.getAll()
    .then(data => setCountries(data))
  }, [])
  return (
    <main>
      <div>
        <p>find countries <input onChange={handleCountries}/></p>
      </div>
      <div>
        { 
          // Nested conditional rendering
          displayCountries.length > 10 ? <p>Too many matches, specify another filter</p> 
          : (
            displayCountries.length === 1 ? <DisplayFullCountry country={displayCountries[0]}/>
            : displayCountries.map(country => 
                <p key={country.cca2}>{ country.name.common } 
                  <button onClick={() => showCountry(country)}>show</button>
                </p>) 
          )
        }
      </div>
    </main>
  )
}

export default App
