import React from 'react'

import storycardcss from "../../Styles/StoryCard.css"
import { Link } from 'react-router-dom'

const StoryCard = ({story}) => {



  return (
    <div className='story-card'>

     
    <div className='story-by-user-bar'>
      
    <Link to={`/aboutuser/${story?.storyByUser?._id}`}>
      
      <img src={story.storyByUser?.profileImage} alt={story.storyByUser?.profileImage} className="profile-image"/>

    </Link>


   
     <p>{story.storyByUser?.userName}</p>
      

    </div>
      
    <img src={story?.storyContent} alt={story?.storyContent}/>


    </div>
  )
}

export default StoryCard