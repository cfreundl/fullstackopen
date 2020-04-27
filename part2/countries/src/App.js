import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filterText, handleFilterTextChange }) => (
  <div>
    find countries
    <input
      value={filterText}
      onChange={handleFilterTextChange}>
    </input>
  </div>
)

const CountryDetails = ({ country }) => (
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
    <img src={country.flag} alt={'flag of ' + country.name} width='100px' />
  </div>
)

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
