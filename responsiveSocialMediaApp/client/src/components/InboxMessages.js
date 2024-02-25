import React, { useEffect, useState } from 'react'
import ChattedWithUser from './ChattedWithUser'

import inboxmessages from "../Styles/InboxMessages.css"
import ChatContent from './ChatContent';

import axios from "axios"

import { useSelector } from "react-redux"


import { io } from "socket.io-client"

const socket = io.connect("http://localhost:2024");

const InboxMessages = () => {

  const currentUser = useSelector((state) => state.helloSocialUser.currentUser)

  const [activeUsers, setActiveUsers] = useState([]);

  

  const [conversationWithSelectedUser, setConversationWithSelectedUser] = useState(null);



  const peer = new RTCPeerConnection({
    iceServers:[{

        urls: "stun:stun.stunprotocol.org"
      
      }]
  });



  useEffect(() => {

    socket.on("active:users", (data) => {


      setActiveUsers(data);

      
    });


  }, [socket, currentUser]);


 



   const filterActiveusers = activeUsers.filter((user) => user.userId !== currentUser._id)


   console.log(filterActiveusers, 'activeusers')


  return (

    <div className='inbox-container'>

      <div className='chatted-with-user-list'>

        {filterActiveusers.map((user) =>  (

          <div onClick={() => setConversationWithSelectedUser(user)}>

            <ChattedWithUser user={user} currentUser={currentUser} />

          </div>

        ))}





      </div>

      {conversationWithSelectedUser ? (

        <div className='selected-user-to-chat-with-container'>

          <ChatContent selectedUser={conversationWithSelectedUser} currentUser={currentUser} />

        </div>

      ) : (

        <h3 className='non-selected-user-text'>Select A User To Chat With </h3>

      )

      }


    </div>
  )
}

export default InboxMessages















{/*



   const [conversationWithSelectedUser, setConversationWithSelectedUser] = useState(false)


    /// chat 



    
  const [allUsers, setAllUsers] = useState([]);

  const [conversation, setConversation] = useState([]);

  const [chatRoomId, setChatRoomId] = useState('');

  const [selectedChatWithUser, setSelectedChatWithUser] = useState(null);

  const [newMessage, setNewMessage] = useState('');



  const currentUserData = {

   _id:currentUser?._id

  }
 

  useEffect(() =>{


    socket.emit("join", currentUserData)



  }, [])




useEffect(() =>{

   const getChatRoom = async() =>{

    if(selectedChatWithUser){                                                             

      const {data} = await axios.post(`http://localhost:2024/chatroom/getuserschatroom/${"658ea4b4eaee7bbf6ec5864d"}/${selectedChatWithUser?._id}`, {
  
      method:"GET",
      headers:{'Content-type':"application/json"},
  
      });
  
      console.log(data._id, 'hhhhhhhh')
  
     setChatRoomId(data._id);
  
    };      
  
    
  };

  getChatRoom();

}, [selectedChatWithUser])





  useEffect(() =>{


    const getUsersConversations = async(e) =>{

      try{


        const {data} = await axios.get(`http://localhost:2024/message/fetchconversation/${chatRoomId}`, {
 
         method:"GET",
         headers:{'Content-Type':"application/json"},
     
        });



        console.log(data, 'conversations');

        setConversation(data);



      }catch(err){
  
        console.log(err);

      }



    }
   
  
    getUsersConversations();


  }, [chatRoomId]);





  useEffect(() =>{


    const getUsers = async() =>{

   try{

     const {data} = await axios.get("http://localhost:2024/getusers"); 

     console.log(data, 'datausers')

     setAllUsers(data)

   }catch(err){

    console.log(err)


   }


  }


  getUsers();


  }, []);





  const sendMessage = async(e) =>{

    e.preventDefault();

    const msgData = {

      chatRoomId:chatRoomId,
      senderId:currentUser?._id,
      text:newMessage

    }

    try{


      const {data} = await axios.post("http://localhost:2024/message/addmsg" ,{

       method:"POST",
       headers:{'Content-Type':"application/json"},
       msgData

      })

      setConversation([...conversation, data])

      setNewMessage('');

   ///socket.emit("message", )

    console.log(data, 'message success')

    }catch(err){
  
       console.log(err)

    }


  }


 






*/}










