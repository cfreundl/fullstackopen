import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import phonebookService from './services/phonebook'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [message, setMessage] = useState(null)

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

  const displayTemporaryMessage = message => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    const entry = persons.find((entry) => entry.name === newName)
    if (entry !== undefined) {
      if (window.confirm(`${entry.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedEntry = { ...entry, number: newNumber }

        phonebookService
          .change(entry.id, changedEntry)
          .then(changedEntry => {
            displayTemporaryMessage(`Changed ${changedEntry.name}`)
            setPersons(persons.map(entry =>
              (entry.id !== changedEntry.id ? entry : changedEntry)))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .add(nameObject)
        .then(newEntry => {
          displayTemporaryMessage(`Added ${newEntry.name}`)
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
          displayTemporaryMessage(`Deleted ${name}`)
          setPersons(persons.filter((person) => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
