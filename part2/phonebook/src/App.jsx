import { useState } from 'react'

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

  const addPerson = (event) => {
    event.preventDefault()
    if (personExists(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
  }
  const personExists = name => persons.find(p => p.name === name)


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

const ContactList = ({persons, filteredContacts, newFilter}) => {
  let contactsToRender = []
    if (newFilter === "") {
      contactsToRender = persons
    } else {
      contactsToRender = filteredContacts
    }
  return (
    <>
      <h2>Numbers</h2>
      {contactsToRender.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredContacts, setFilteredContacts] = useState([])

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
                  newFilter={newFilter}/>
    </div>
  )
}

export default App