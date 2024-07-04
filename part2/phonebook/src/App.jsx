import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {

  const {persons, newFilter, setFilteredContacts, setNewFilter} = props
  const handleFilterChange = (event) => {
    const filter = event.target.value.toLowerCase()
    const filteredContacts = persons.filter(person => {
      const contactName = person.name.toLowerCase()
      return contactName.includes(filter)
    })
    setFilteredContacts(filteredContacts)
    setNewFilter(filter)
  }

  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  )
}

const AddContact = (props) => {

  const {newName, newNumber, persons, setPersons, handleNameChange, handleNumberChange} = props
  const personExists = name => persons.find(p => p.name === name)
  const updateNumber = () => {
    const currentPerson = personExists(newName)
    const updatedPerson = {...currentPerson, number: newNumber}
    personService.update(currentPerson.id, updatedPerson)
    .then(updatedPerson => {
      setPersons(persons.map(person => person.id === currentPerson.id ? updatedPerson : person))
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (personExists(newName)) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) &&
        updateNumber()
    } else {
      personService.create({name: newName, number: newNumber})
      .then(person => {
        setPersons(persons.concat({name: person.name, number: person.number, id: person.id}))
      })
    }
  }


  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const ContactList = ({persons, filteredContacts, newFilter, setPersons}) => {
  const contactsToRender = newFilter === "" ? persons : filteredContacts

  const handleClick = (id, name) => () => {
    if (window.confirm(`Are you sure you want to say goodbye to your friend ${name}?`)) {
      personService.remove(id)
      .then(removedPerson => {
      setPersons(persons.filter(person => person.id !== removedPerson.id))
      })
    }
  }

  return (
    <>
      <h2>Numbers</h2>
      {contactsToRender.map(person =>
        <div key={person.id}>{person.name} {person.number} <button onClick={handleClick(person.id, person.name)}>delete</button></div>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredContacts, setFilteredContacts] = useState([])

  useEffect(() => {
    personService.getAll()
    .then(people => {
      setPersons(people)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons}
              newFilter={newFilter}
              setFilteredContacts={setFilteredContacts}
              setNewFilter={setNewFilter}/>
      <AddContact newName={newName}
                  newNumber={newNumber}
                  persons={persons}
                  setPersons={setPersons}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}/>
      <ContactList persons={persons}
                  filteredContacts={filteredContacts}
                  newFilter={newFilter}
                  setPersons={setPersons}/>
    </div>
  )
}

export default App