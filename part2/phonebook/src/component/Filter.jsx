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

  export default Filter