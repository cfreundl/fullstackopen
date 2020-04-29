import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.find((entry) => entry.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      axios
        .post('http://localhost:3001/persons', nameObject)
        .then(response => {
          setPersons(persons.concat(nameObject))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterText={filterText}
        handleFilterTextChange={handleFilterTextChange}
      />
      <h2>Add new entry</h2>
      <PersonForm
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterText={filterText} />
    </div>
  )
}

export default App
