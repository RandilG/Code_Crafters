import React from 'react'
import './posterChat.css'

const PosterChat = ({message, timeStamp}) => {
  return (
    <div className='posterChatContainer'>
      <p className='posterMessage'>{message}</p>
      <p className='posterTimeStamp'>{timeStamp}</p>
    </div>
  )
}

export default PosterChat