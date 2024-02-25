import React, { useEffect, useState, useCallback } from 'react'


import ReactPlayer from 'react-player';
import useSocket from '../hooks/useSocketFunction';

import { useSelector } from "react-redux"

import {useNavigate} from "react-router-dom"

const WebrtcRoom = () => {

  const socket = useSocket();


  const currentUser = useSelector((state) => state.helloSocialUser.currentUser)



  const [room, setRoom] = useState('');

  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const navigate = useNavigate();



  // video calling functionalities



  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.stunprotocol.org"
      }
    ]
  });


  const handleSubmitForm = useCallback(async (e) => {


    e.preventDefault();


    socket.emit('room:join', { email: currentUser.email, room })


  }, [room, socket]);






  const handleJoinRoom = useCallback(async (data) => {

    const { email, room } = data;

     navigate(`/room/${room}`);

  }, [navigate])





  useEffect(() => {


    socket.on('room:join', handleJoinRoom);
    
    
    
          return () => {
    
            socket.off('room:join', handleJoinRoom)
    
          }


  }, [socket, handleJoinRoom])


























  return (
    <div>


      <form onSubmit={handleSubmitForm}>


        <input type='text' placeholder='write your room' onChange={(e) => setRoom(e.target.value)} />

        <button type='submit'>Send</button>

      </form>


      {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={myStream}
          />
        </>
      )}


      {remoteStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={remoteStream}
          />
        </>
      )}



    </div>
  )
}

export default WebrtcRoom