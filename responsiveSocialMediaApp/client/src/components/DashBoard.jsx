import React, { useEffect, useRef, useState } from 'react'

import dashboard from "../Styles/Dashboard.css"
import InstagramPost from './InstagramPost.jsx'
import axios from "axios"


import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
import AddStory from './storyComponents/AddStory.js'
import useSocket from '../hooks/useSocketFunction.js'
const DashBoard = () => {

  const currentUser = useSelector((state) => state.helloSocialUser.currentUser)


  const socket = useSocket();
  
  const [stories, setStories] = useState([])
  
  const [posts, setPosts] = useState([])
  
  const fileInputRef = useRef(null)
  
  
  console.log(posts, 'setPosstststtss')
  
  
  
  
   





  useEffect(() => {

    const fetchStories = async () => {
      try {


        const res = await axios.get(`http://localhost:2024/api/v1/hellosocial/story/get/stories/${currentUser._id}`, {

          method: "GET",
          headers: { "Content-Type": "application/json" }

        });






        // Get tomorrow's date



        setStories(res.data[0])




      } catch (err) {

        console.log(err)

      }


    }


    fetchStories();



  }, [currentUser._id]);


  useEffect(() =>{

    const getPosts = async() =>{

      try{
   
        const res = await axios.get(`http://localhost:2024/api/v1/hellosocial/posts/get/fillmainpage/${currentUser?._id}`)

        console.log(res.data, 'posts')

        setPosts(res.data[0])

      }catch(err){

        console.log(err)

      }


    }
 
    getPosts()


  }, [])





  const deleteExpiredStory = async (story) => {



    try {

      const res = await axios.delete(`http://localhost:2024/api/v1/hellosocial/story/delete/${story?._id}`)

    } catch (err) {

      console.log(err)

    }


  }


  stories?.map((story, index) => {

    deleteExpiredStory(story)

  })


  const handleAddStoryClick = () =>{

     fileInputRef.current.click()

  }


  return (

    <div className='container'>


      <div className='story-bar'> {/* storyBar Start */}


          <div className='currentUser-story-container'>

            <Link >

              <img src={currentUser?.profileImage} alt={currentUser?.profileImage} className='current-user-profileImage' />
            
            </Link>

            {/* Add Story Component contians other 
            classes of positioning it to the middle*/}

            <AddStory currentUser={currentUser}/>

          </div>


        {stories?.length ? stories?.map((story) => (

          <div className='followed-user-story'>

            <Link to={`/stories/${story.storyByUser?.userName}/${story?._id}`} >

              <img src={story?.storyByUser?.profileImage} alt={story?.storyByUser?.profileImage} className='story-by-user-profileImage' />            

            </Link>

          </div>




        )) : "none of the accounts you follow have Added Any Story"


        }



      </div> {/*storyBar End*/}

      <div className='posts-container'>

        <ul>

          
          {posts?.length ? posts?.map((post) => (

            <li>

              <InstagramPost key={posts?._id} post={post} currentUser={currentUser} />

            </li>

          )) : ""

          }
             

        </ul>



      </div>




    </div>
  )
}

export default DashBoard
















