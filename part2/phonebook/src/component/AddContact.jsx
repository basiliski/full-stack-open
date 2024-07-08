import personService from '../services/persons'

const AddContact = (props) => {

    const {
      newName,
      newNumber,
      persons,
      setPersons,
      handleNameChange,
      handleNumberChange,
      setMessage} = props

    const personExists = name => persons.find(p => p.name === name)

    const clearMessage = () =>
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    
    const updateNumber = () => {
      const currentPerson = personExists(newName)
      const updatedPerson = {...currentPerson, number: newNumber}
      personService.update(currentPerson.id, updatedPerson)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === currentPerson.id ? updatedPerson : person))
        setMessage(`Updated ${newName}`)
        clearMessage()
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
          setMessage(`Added ${person.name}`)
          clearMessage()
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

  export default AddContact