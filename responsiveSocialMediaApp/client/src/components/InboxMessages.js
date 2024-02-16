import React, { useState } from 'react'
import ChattedWithUser from './ChattedWithUser'

import inboxmessages from "../Styles/InboxMessages.css"
import ChatContent from './ChatContent'

const InboxMessages = () => {

   const [conversationWithSelectedUser, setConversationWithSelectedUser] = useState(false)

  return (

    <div className='inbox-container'>

        <div className='chatted-with-user-list'>

       <div onClick={() => setConversationWithSelectedUser(true)}>

        <ChattedWithUser />

       </div>
      

        </div>

        {conversationWithSelectedUser ? (

     <div className='selected-user-to-chat-with-container'>
 

      <ChatContent onClick={()=> setConversationWithSelectedUser(false)} />

     </div>

        ) : (

       <h3 className='non-selected-user-text'>Select A User To Chat With </h3>

        )

        }
 

    </div>
  )
}

export default InboxMessages