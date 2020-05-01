import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    const messageClass = message.isError ? 'error' : 'info'
    return (
      <div className={messageClass}>
        {message.text}
      </div>
    )
  }

  export default Notification
