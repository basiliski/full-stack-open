import personService from '../services/persons'

const ContactList = (props) => {

  const {
    persons,
    filteredContacts,
    newFilter,
    setPersons,
    setMessage,
    setError } = props

    const contactsToRender = newFilter === "" ? persons : filteredContacts

    const clearMessage = () =>
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
  
    const handleClick = (id, name) => () => {
      if (window.confirm(`Are you sure you want to say goodbye to your friend ${name}?`)) {
        personService.remove(id)
        .then(removedPerson => {
        setPersons(persons.filter(person => person.id !== removedPerson.id))
        })
        .catch(error => {
          setError(error)
          setMessage(`'${name}' has already been removed from the phonebook`)
          clearMessage()
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
  
  export default ContactList