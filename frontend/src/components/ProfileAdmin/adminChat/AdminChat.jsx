import React from 'react'
import './adminChat.css'

const AdminChat = ({message, timeStamp}) => {
  return (
    <div className='adminChatContainer'>
      <p className='adminMessage'>{message}</p>
      <p className='adminMimeStamp'>{timeStamp}</p>
    </div>
  )
}

export default AdminChat
