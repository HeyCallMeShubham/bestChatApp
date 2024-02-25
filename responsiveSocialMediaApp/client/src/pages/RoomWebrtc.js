
import React, { useCallback, useEffect, useState } from 'react'

import useSocket from '../hooks/useSocketFunction';


import ReactPlayer from 'react-player';



const RoomWebrtc = () => {


  const socket = useSocket();

  const [remoteSocketId, setRemoteSocketId] = useState(null)

  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);


  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.stunprotocol.org"
      }
    ]
  });






  const handleCallUser = useCallback(async () => {


    const stream = await navigator.mediaDevices.getUserMedia({

      video: true

    });

    const offer = await peer.createOffer();

    socket.emit('outgoing:call', { to: remoteSocketId, offer })


    setMyStream(stream);


  }, [remoteSocketId, socket]);





  const handleUserJoined = useCallback(async ({ email, id }) => {


    console.log('a new user joined', email);

    setRemoteSocketId(id);



  }, [])




  const handleIncomingCall = useCallback(async ({ from, offer }) => {

    console.log('incomming:call', from, offer)

    setRemoteSocketId(from)

    const stream = await navigator.mediaDevices.getUserMedia({

      video: true

    });

    setMyStream(stream)


    await peer.setRemoteDescription(offer);

    const ans = await peer.createAnswer();

    await peer.setLocalDescription(new RTCSessionDescription(ans))



    socket.emit('call:accepted', { to: from, offer })


  }, [socket]);



  const handleCallAccepted = useCallback(async ({ from, ans }) => {


    await peer.setRemoteDescription(ans);



    for (const track of myStream.getTracks()) {

      peer.addTrack(track, myStream);

    }


  }, [myStream]);




  const handleNegoNeeded = useCallback(async() =>{

    const offer = await peer.createOffer();
  
    socket.emit('peer:nego:needed', {offer, to:remoteSocketId});
     

  }, [])

  





  useEffect(() =>{

    peer.addEventListener('negotiationneeded', handleNegoNeeded);
    
    
    return () =>{

      peer.removeEventListener('negotiationneeded', handleNegoNeeded);

    }

  }, [handleNegoNeeded])








  useEffect(() =>{

    peer.addEventListener('track', async(e) =>{

     const remoteStream = e.streams

     setRemoteStream(remoteStream);

    })



  }, [])
     




  const handleNegoNeededIncoming = useCallback(async({from, offer}) =>{
         
        const ans = peer.createAnswer();

        socket.emit('peer:nego:done', {to:from, ans});

  }, [socket]);





   const handleNegoNeededFinal = useCallback(async({ ans}) =>{

      await peer.setLocalDescription(ans)

   }, [])



 
  
  
  useEffect(() => {
    
    socket.on('user:joined', handleUserJoined);
    
    socket.on('incomming:call', handleIncomingCall);
    
    socket.on('call:accepted', handleCallAccepted);

    socket.on('peer:nego:needed', handleNegoNeededIncoming);

    socket.on('peer:nego:final', handleNegoNeededFinal);

    
    
    
    
    return () => {

      
      
      socket.off('user:joined', handleUserJoined);

      socket.off('incomming:call', handleIncomingCall);
      
      socket.off('call:accepted', handleCallAccepted);
      
      socket.off('peer:nego:needed', handleNegoNeededIncoming);
      
      socket.off('peer:nego:final', handleNegoNeededFinal);



    }


  }, [socket, handleUserJoined, handleCallAccepted, handleIncomingCall, handleNegoNeededIncoming, handleNegoNeededFinal]);









  return (
    <div>


      <h1>{remoteSocketId ? "connected" : "no one in room"} </h1>
      <h1>{remoteSocketId ?
        <button onClick={handleCallUser}>call</button>
        : "no one in room"} </h1>


      {myStream && (

        <ReactPlayer height={'400px'} width={"400px"} playing url={myStream} />

      )


      }

      {remoteStream && (

        <ReactPlayer height={'400px'} width={"400px"} playing url={remoteStream} />

      )


      }



    </div>
  )
}

export default RoomWebrtc