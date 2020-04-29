import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(phonebook => {
        setPersons(phonebook)
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

      phonebookService
        .add(nameObject)
        .then(newEntry => {
          setPersons(persons.concat(newEntry))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deleteEntry = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .remove(id)
        .then(response => {
          setPersons(persons.filter((person) => person.id !== id))
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
      <Persons
        persons={persons}
        filterText={filterText}
        deleteEntry={deleteEntry}
      />
    </div>
  )
}

export default App
