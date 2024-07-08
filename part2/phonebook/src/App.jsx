import { useState, useEffect } from 'react'
import personService from './services/persons'
import ContactList from './component/ContactList'
import Filter from './component/Filter'
import AddContact from './component/AddContact'
import Notification from './component/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredContacts, setFilteredContacts] = useState([])
  const [notificationMessage, setMessage] = useState(null)
  const [error, setError] = useState(false)

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
      <Notification message={notificationMessage} isError={error}/>
      <Filter persons={persons}
              newFilter={newFilter}
              setFilteredContacts={setFilteredContacts}
              setNewFilter={setNewFilter}/>
      <AddContact newName={newName}
                  newNumber={newNumber}
                  persons={persons}
                  setPersons={setPersons}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}
                  setMessage={setMessage}/>
      <ContactList persons={persons}
                  filteredContacts={filteredContacts}
                  newFilter={newFilter}
                  setPersons={setPersons}
                  setMessage={setMessage}
                  setError={setError}/>
    </div>
  )
}

export default App