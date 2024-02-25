import React from 'react';

import './App.css';


import { Routes, Route } from "react-router-dom"
import Main from './pages/Main.js';
import DashBoard from './components/DashBoard.jsx';
import PostDetails from './pages/PostDetails.js';
import AboutProfile from './pages/AboutProfile.js';
import InboxMessages from './components/InboxMessages.js';
import ChatContent from './components/ChatContent.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import ProtectedRoute from './components/ProtectedRoutes.js';
import Story from './pages/Story.js';
import WebrtcRoom from './pages/WebrtcRoom.js';
import RoomWebrtc from './pages/RoomWebrtc.js';




function App() {

  return (

    <div className="App">

      <Routes>
        
        <Route element={<ProtectedRoute />}>



          <Route path='/' element={<Main />} >


          <Route index path='/' element={<DashBoard />} />

          <Route index path='/:postId/postdetail' element={<PostDetails />} />
 
          <Route index path='/direct/inbox' element={<InboxMessages />} />

          <Route path='/aboutuser/:userId' element={<AboutProfile/>}/>

          <Route path='/stories/:profileName/:storyId' element={<Story />}/>

          <Route path='/room/:roomid' element={<RoomWebrtc />}/>

          <Route path='/registerroom' element={<WebrtcRoom />}/>


      

          </Route>

        </Route>


          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

      </Routes>

    </div>

  );
}

export default App;
