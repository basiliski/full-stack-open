import { useState, useEffect } from 'react'
import axios from 'axios'
import weatherService from "./service/weatherService"

const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [apiAddress, setApiAddress] = useState("all")

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/${apiAddress}`)
      .then(response => {
        if (apiAddress === "all") {
          const countries = response.data.map(c => c.name.common)
          setAllCountries(countries)
          setFilteredCountries(countries)
        } else {
          setFilteredCountries([response.data])
         }
      })
  }, [apiAddress])

  const filterCountries = (filter) => {
    setSearchTerm(filter)
    const matches = allCountries.filter(c => c.toLowerCase().includes(filter.toLowerCase()))
    // initiate a new api call with useEffect when
    // only one country matches the written filter
    if (matches.length === 1) {
      const newApiAddress = `name/${matches[0]}`
      // this little bad boy here is what someone might call "purkka" but
      // I call it an inventive way to prevent a bug and an efficient use of time
      // (it forces rerender in a case where the same country is filtered twice in a row)
      setApiAddress(newApiAddress === apiAddress ? apiAddress.toLowerCase() : newApiAddress)
      //otherwise show the list of countries that match the filter
    } else {
      setFilteredCountries(matches)
    }
  }


  return (
    <div>
      <Search searchTerm={searchTerm} filterCountries={filterCountries}/>
      {filteredCountries.length !== 1 ?
        <CountryList filteredCountries={filteredCountries}
                      filterCountries={filterCountries}/>
        : <CountryView filteredCountry={filteredCountries[0]}/>}
    </div>
  )
}

const Search = ({ searchTerm, filterCountries }) => {

  const handleChange = (event) => {
    filterCountries(event.target.value)
  }

  return(
    <div>
      <form>
        find countries <input value={searchTerm} onChange={handleChange}></input>
      </form>
      
    </div>
  )
}

const CountryList = ({ filteredCountries, filterCountries}) => {
  if (filteredCountries.length > 10) return <div>Too many matches, specify another filter</div>

  const handleClick = (country) => () => {
    filterCountries(country)
  }
  
  return filteredCountries.map(country => <div key={country}>{country} <button onClick={handleClick(country)}>show</button></div>)
}

const CountryView = ({ filteredCountry }) => {

  return(
    <div>
      <h1>{filteredCountry.name.common} {filteredCountry.flag}</h1>
      <div>capital {filteredCountry.capital}</div>
      <div>area {filteredCountry.area}</div>
      <h4>Languages:</h4>
      <ul>
          {Object.values(filteredCountry.languages).map(l => <li key={l}>{l}</li>)} 
      </ul>
      <img src={filteredCountry.flags.png} alt="Country flag"/>
      <Weather city={filteredCountry.capital}/>
    </div>
  )
}

const Weather = ({ city }) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService.getWeather(city)
    .then(data => {
      setWeather(data)
    })
  }, [city])
  
  return(
    weather && <div>
      <h3>Weather in {city}</h3>
      <div>temperature {weather.main.temp} Celcius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}
export default App