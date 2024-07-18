import React from 'react'
import './seekerChat.css'

const SeekerChat = ({message, timeStamp}) => {
  return (
    <div className='seekerChatContainer'>
      <p className='seekerMessage'>{message}</p>
      <p className='seekerTimeStamp'>{timeStamp}</p>
    </div>
  )
}

export default SeekerChat