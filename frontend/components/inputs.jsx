import React from "react"


const Input = (props) => {
    return (

        <>
      
        {props.persons.map((person, index)=> {
        // return  <p key={index}> <strong>Name: </strong>{person.name} <strong>Number: </strong> {person.number} </p>
        return     <tr key={index}>
        <td>
          {person.name}
        </td>
        <td>
          {person.number}
        </td>
        <td>
          <button person={person}  className="poistonappi"  onClick={(event) => {props.deletePerson(person)}} >
            [x] Delete
          </button>
        </td>
      </tr>
        })}
       
    </>
    )
}


export default Input