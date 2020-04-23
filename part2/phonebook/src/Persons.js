import React from 'react'

const Persons = ({ persons, filterText }) => {
  const filterCaseInsensitiveBy = (searchFor) => (
    (person) => person.name.toLowerCase()
      .includes(searchFor.toLowerCase())
  )

  return (
    <div>
      {persons.filter(filterCaseInsensitiveBy(filterText))
        .map((person, index) =>
          <div key={index}>{person.name} {person.number}</div>
        )}
    </div>
  )
}

export default Persons
