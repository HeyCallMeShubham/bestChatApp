import React, { useEffect, useState } from 'react'
 
import storycss from "../Styles/Story.css"

import {useParams} from "react-router-dom"
import axios from 'axios';
import { useSelector } from 'react-redux';
import StoryCard from '../components/storyComponents/StoryCard';

const Story = () => {

  const currentUser = useSelector((state) => state.helloSocialUser.currentUser)

  const {profileName} = useParams();

  const [stories, setStories] = useState([])


  useEffect(() => {

    const fetchStories = async () => {
      try {


        const res = await axios.get(`http://localhost:2024/api/v1/hellosocial/story/get/stories/${currentUser?._id}`, {

          method: "GET",
          headers: {"Content-Type": "application/json" }

        });

        console.log(res?.data, 'stories')

        setStories(res?.data)
   




      } catch (err) {

        console.log(err)

      }





      //   const dd = res.data.filter((story) => story.storyByUser._id === story.storyByUser._id)

      //     console.log(dd.length, 'ddddd')

      //  res.data.map((story) =>{

      ///    const singleOnUserStories = new Set(story.storyByUser._id)

      ///   console.log(singleOnUserStories, 'signle')

      ///   })




    }


    fetchStories();



  }, [])


  return (
    <div className='story-page-container' >

      {stories.length ? stories.map((story) =>(

        <StoryCard story={story} />


      )) : ""
      
      
      }

        
    </div>
  )
}

export default Story