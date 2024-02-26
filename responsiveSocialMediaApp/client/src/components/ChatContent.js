import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
  MDBScrollspy,
  MDBScrollspyLink,
  MDBScrollspySubList

} from "mdb-react-ui-kit";

import axios from "axios"

import ReactPlayer from 'react-player';

import chatcontent from "../Styles/ChatContent.css"

import { IoIosArrowDropleft } from "react-icons/io";

import useSocket from "../hooks/useSocketFunction";

import Peer from "simple-peer";
import ConversationText from "./ConversationText";


{/*

use fluid attribute in MDBContainer folder

*/}








const ChatContent = ({ selectedUser, currentUser }) => {

  const [chatRoomId, setChatRoomId] = useState('');

  const [selectedChatWithUser, setSelectedChatWithUser] = useState(null);

  const [conversations, setConversations] = useState([]);

  const [message, setMessage] = useState("");

  const [myStream, setMyStream] = useState(null)




  const socket = useSocket();






  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.stunprotocol.org"
      }
    ]
  });











  useEffect(() => {


    const getChatRoom = async () => {

      if (selectedUser) {

        const { data } = await axios.post(`http://localhost:2024/api/v1/chatroom/getuserschatroom/${currentUser?._id}/${selectedUser?.userId}`, {

          method: "POST",
          headers: { "Content-type": "application/json" }

        });


        setChatRoomId(data._id);

      };

    };


    getChatRoom();


    socket.emit('active:room', { chatRoomId, joinBy: currentUser.email });


  }, [selectedUser, chatRoomId]);








  useEffect(() => {


    const getUsersConversations = async () => {

      try {



        const { data } = await axios.get(`http://localhost:2024/api/v1/messages/fetchconversation/${chatRoomId}`, {

          method: "GET",
          headers: { 'Content-Type': "application/json" }

        });



        setConversations(data);



      } catch (err) {

        console.log(err)

      }

    };



    getUsersConversations();



  }, [chatRoomId]);







  const sendMessage = async (e) => {

    e.preventDefault();

    const msgdata = {

      senderId: currentUser._id,

      chatRoomId: chatRoomId,

      text: message

    }

    try {


      const message = await axios.post('http://localhost:2024/api/v1/messages/addmsg', {


        method: "POST",
        headers: { 'Content-Type': "application/json" },
        msgdata


      });



      socket.emit('send-message', msgdata);



      setConversations([...conversations, msgdata]);


    } catch (err) {

      console.log(err)

    }

  };









  useEffect(() => {

    socket.on('newmessage', (data) => {


      const newMessage = data


      setConversations([...conversations, newMessage]);


    });


  }, [socket]);






























  const makeCall = async (e) => {


    try {

      const offer = await peerConnection.createOffer();

      await peerConnection.setLocalDescription(offer);



      socket.emit("making:call", { offer, to: selectedUser.email, callingBy: currentUser.email, chatRoomId })


    } catch (err) {

      console.log(err)

    }

  }




  useEffect(() => {



    socket.on("incoming:call", async (data) => {

      const { offer, from } = data

      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer))


      const answer = await peerConnection.createAnswer();


      socket.emit("answer:call", { to: from, answer: answer });


    });



  }, [socket])




  useEffect(() => {



    socket.on('call:answer', async (data) => {

      const { answer, from } = data



      await peerConnection.setLocalDescription(answer);


      navigator.mediaDevices.getUserMedia({

        video: true

      }).then((stream) => {

        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));


        setMyStream(stream);


      })


    })


  }, [socket])









  return (
    <MDBContainer className="" style={{ backgroundColor: "#fff", width: "100%", height: "100%", textAlign: "center", alignItems: "center", position: "relative", overflowY: "hidden", padding: "0" }}>
      <MDBRow className="d-flex justify-content-center " style={{ height: "100%" }}>
        <MDBCol style={{}} >
          <MDBCard id="chat2" style={{ borderRadius: "15px", className: "conversation-screen", width: "100%", height: '100%', position: "absolute", margin: "0" }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3 " >

              <IoIosArrowDropleft className="back-arrow" />

              <h5 className="mb-0">{selectedUser.email}</h5>

              <MDBBtn color="primary" size="sm" rippleColor="dark" onClick={makeCall}>
                video Call
              </MDBBtn>

            </MDBCardHeader>

            <MDBScrollspy

              suppressScrollX
              style={{ position: "relative", height: "88%", overflowY: "scroll", }}
            >

              <MDBCardBody >



                {myStream && (

                  <ReactPlayer url={myStream} playing playsinline />

                )


                }


                {conversations.length ? conversations?.map(conversation => (

                  <>
                    {conversation?.senderId === currentUser?._id ? (



                      <div className="d-flex flex-row justify-content-start" style={{ alignItems: "center" }}>

                        <ConversationText senderId={conversation?.senderId} conversation={conversation} currentUser={currentUser?._id} />

                      </div>

                    ) : (



                      <div className="d-flex flex-row justify-content-end  mb-4 pt-1" style={{ alignItems: "center" }}>

                        <ConversationText senderId={conversation?.senderId} conversation={conversation} />

                      </div>



                    )

                    }

                  </>

                )) : "start some conversation'"



                }



              </MDBCardBody>








            </MDBScrollspy>


            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3" style={{ position: "relative", top: "auto" }}>
              <img
                src={currentUser?.profileImage}
                alt={currentUser?.profileImage}
                style={{ width: "45px", height: "88%", borderRadius: "50%" }}
              />
              <input
              
                type="text"
                class="form-control form-control-lg"
                id="exampleFormControlInput1"
                placeholder="Type message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}

              />

              <a className="ms-1 text-muted" href="#!">

                <MDBIcon fas icon="paperclip" />

              </a>

              <a className="ms-3 text-muted" href="#!">

                <MDBIcon fas icon="smile" />

              </a>

              <a className="ms-3" href="#!">

                <MDBIcon fas icon="paper-plane" onClick={sendMessage} />

              </a>

            </MDBCardFooter>

          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>

  );
}



export default ChatContent





{/*


              <MDBCardBody >
                <div className="d-flex flex-row justify-content-start" style={{border:'solid 2px red'}}>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      Hi
                    </p>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      How are you ...???
                    </p>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      What are you doing tomorrow? Can we come up a bar?
                    </p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                      23:58
                    </p>
                  </div>
                </div>

                <div className="divider d-flex align-items-center mb-4">
                  <p
                    className="text-center mx-3 mb-0"
                    style={{ color: "#a2aab7" }}
                  >
                    Today
                  </p>
                </div>

                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Hiii, I'm good.
                    </p>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      How are you doing?
                    </p>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Long time no see! Tomorrow office. will be free on sunday.
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      00:06
                    </p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      Okay
                    </p>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      We will go on Sunday?
                    </p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                      00:07
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-end mb-4">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      That's awesome!
                    </p>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      I will meet you Sandon Square sharp at 10 AM
                    </p>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Is that okay?
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      00:09
                    </p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      Okay i will meet you on Sandon Square
                    </p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                      00:11
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-end mb-4">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Do you have pictures of Matley Marriage?
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      00:11
                    </p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      Sorry I don't have. i changed my phone.
                    </p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                      00:13
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-end">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Okay then see you on sunday!!
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      00:15
                    </p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>



                <div className="d-flex flex-row justify-content-end">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Okay then see you on sunday!!
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      00:15
                    </p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>

                <div className="d-flex flex-row justify-content-end">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Okay then see you on sunday!!
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      00:15
                    </p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>

                <div className="d-flex flex-row justify-content-end">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      Okay then see you on sunday!!
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      00:15
                    </p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>



              </MDBCardBody>



*/}