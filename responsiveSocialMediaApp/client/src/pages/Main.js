import React, { useEffect } from 'react'

import {Outlet} from "react-router-dom"

import LeftBar from "../components/LeftBar.js"
import Rightbar from "../components/RightBar.js"

import main from "../Styles/Main.css"
import useSocket from '../hooks/useSocketFunction.js'
import { useSelector } from 'react-redux'



const Main = () => {



  const currentUser = useSelector((state) => state.helloSocialUser.currentUser)



  const socket = useSocket();

  useEffect(() =>{

    
  socket.emit('join', currentUser);


  }, [socket]);





  return (
    
  <div className='main-container'>

 <LeftBar />
 
 <div className='outlet-container'>

 <Outlet />

 </div>

 <Rightbar />
   
 </div> 
  
  
  )
}

export default Main