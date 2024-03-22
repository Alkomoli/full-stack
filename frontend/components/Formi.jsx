const Formi = (props) => {
const {newName, handleNoteChange, newNumber, onNumberChange, addNote} = props
    return (
        <form>
        
        <div> name: <input value={newName}  onChange={handleNoteChange} /></div>
        <div>  number: <input onChange={onNumberChange} value={newNumber}/>  </div>
        
          
          
          <div>
            <button onClick={addNote} type="submit">add</button>
          </div>
        </form>
    )
}

export default Formi