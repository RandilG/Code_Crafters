import React from 'react'
import './adminChatPoster.css'

const AdminChatPoster = ({message, timeStamp}) => {
  return (
    <div className='adminChatContainer'>
      <p className='adminMessage'>{message}</p>
      <p className='adminMimeStamp'>{timeStamp}</p>
    </div>
  )
}

export default AdminChatPoster
