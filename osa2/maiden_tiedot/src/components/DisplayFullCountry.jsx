import WeatherInfo from './WeatherInfo'
const LAT = 0
const LNG = 1

const DisplayFullCountry = ({ country }) => {
    return (
    <div>
        <h1>{ country.name.common }</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages</h3>
        <ul>
            {
                Object.entries(country.languages).map(
                    ([_, language]) => <li key={language}>{ language }</li> 
                )
            }
        </ul>
        <img src={ country.flags.png } alt={ country.flags.alt }/>
        <WeatherInfo 
            lat={country.capitalInfo.latlng[LAT]} 
            lng={country.capitalInfo.latlng[LNG]}
        />
    </div>
  )
}

export default DisplayFullCountry