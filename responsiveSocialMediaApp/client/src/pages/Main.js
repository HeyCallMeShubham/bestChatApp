import React from 'react'

import {Outlet} from "react-router-dom"

import LeftBar from "../components/LeftBar.js"
import Rightbar from "../components/RightBar.js"

import main from "../Styles/Main.css"



const Main = () => {


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