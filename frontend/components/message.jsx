

const Notification = ({ message, status }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="messake">
        {message}
      </div>
    )
  }
  
  export default Notification