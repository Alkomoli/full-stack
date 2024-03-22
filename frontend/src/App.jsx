import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import Input from '../components/inputs'
import Formi from '../components/Formi'
import noteService from './services/notes'
import Notification  from '../components/message'
import './index.css'
import ENotification from '../components/errorMessage'







const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [numbers, setNumbers] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [eMessage, seteMessage] = useState(null)


  useEffect(() => {
    console.log("efekti")
    axios
    .get("http://localhost:3001/api/persons")
    .then(response => {
      console.log("suoritettu")
      setPersons(response.data)
    })
  }, [])




    const addNote = (e) => {
        e.preventDefault()
        const newPerson = {
          name: newName,
          number: newNumber
        }

        setPersons(persons.concat(newPerson))
        setNewName("")
        setNewNumber("")
        console.log(persons)
        const toFind = persons.find(person => person.name === newName )
        if(toFind !== undefined) {
          alert(`${newName} on jo lisätty!`)
          return
        }

        seteMessage("Henkilö lisätty onnistuneesti!")
        console.log(eMessage)

        setTimeout(()=> {
          seteMessage(null)
        }, 4000)

      // axios
      // .post("http://localhost:3001/persons", newPerson)
      // .then(response => {
      //   setPersons(persons.concat(response.data))
      // })

      noteService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data))
      })
    }

     const deletePerson = (person) => {
          if(window.confirm(`delete ${person.name}?`)) {
            noteService
            .poista(person.id)
            .then((response) => response.data)
            .then((response) => 
            setPersons(persons.filter(p => p.id !== person.id))
            )
         
           
                
          setErrorMessage("Henkilö poistettu onnistuneesti!")
          setTimeout(()=> {
            setErrorMessage(null)
          }, 5000)
            
          }
          

     }

    const handleNoteChange = (e) => {
      console.log(e.target.value)
      setNewName(e.target.value)

    }

      const onNumberChange = (e) => {
        setNewNumber(e.target.value)
      }

  return (
    <>
      <h2>Phonebook</h2>

      <Formi addNote={addNote} newName={newName} handleNoteChange={handleNoteChange} onNumberChange={onNumberChange} newNumber={newNumber} />
      
          <Notification message={errorMessage}/>  
          <ENotification emessage={eMessage}/>    
      {/* <form>

      <div> name: <input value={newName}  onChange={handleNoteChange} /></div>
      <div>  number: <input onChange={onNumberChange} value={newNumber}/>  </div>


        <div>
          <button onClick={addNote} type="submit">add</button>
        </div>
      </form> */}
      <h2>Numbers</h2>

     {/* <div>

    {persons.map((person, index)=> {
    return  <p key={index}> <strong>Name: </strong>{person.name} <strong>Number: </strong> {person.number} </p>
    })}
</div> */}
< Input deletePerson={deletePerson} persons={persons}/>


    </>
  )

}

export default App