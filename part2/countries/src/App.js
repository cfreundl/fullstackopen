import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const Filter = ({ filterText, handleFilterTextChange }) => (
  <div>
    find countries
    <input
      value={filterText}
      onChange={handleFilterTextChange}>
    </input>
  </div>
)

const Weather = ({ weather }) => {
  if (weather.hasOwnProperty('main')) {
    return (
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className='weathericon'
        />
        <div><b>temperature:</b> {weather.main.temp} °C</div>
        <div><b>wind:</b> {weather.wind.speed} km/h</div>
      </div>
    )
  }

  return (
    <div>Weather loading</div>
  )
}

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  const city = country.capital

  useEffect(() => {
    const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?appid=' +
      api_key + '&units=metric&q=' + city
    axios
      .get(weatherURL)
      .then(response => {
        setWeather(response.data)
      })
  }, [api_key, city])

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language, index) =>
          <li key={index}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`} width='100px' />
      <h2>Weather in {country.capital}</h2>
      <Weather weather={weather} />
    </div>
  )
}

const Countries = ({ countries, filterText, setFilterText }) => {
  const filterCaseInsensitiveBy = (searchFor) => (
    (country) => country.name.toLowerCase()
      .includes(searchFor.toLowerCase())
  )

  const filteredCountries =
    countries.filter(filterCaseInsensitiveBy(filterText))

  if (filteredCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (filteredCountries.length === 1) {
    return (
      <div>
        <CountryDetails country={filteredCountries[0]} />
      </div>
    )
  }

  return (
    <div>
      {filteredCountries.map((country, index) =>
        <div key={index}>
          {country.name}
          <button onClick={() => setFilterText(country.name)}>show</button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter
        filterText={filterText}
        handleFilterTextChange={handleFilterTextChange}
      />
      <Countries
        countries={countries}
        filterText={filterText}
        setFilterText={setFilterText}
      />
    </div>
  );
}

export default App;
