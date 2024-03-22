

const ENotification = ({ emessage, status }) => {
    if (emessage === null) {
      return null
    }
  
    return (
      <div className="viesti">
        {emessage}
      </div>
    )
  }
  
  export default ENotification