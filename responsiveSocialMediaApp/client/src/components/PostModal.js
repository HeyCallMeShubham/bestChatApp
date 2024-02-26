import React, { useEffect, useState } from 'react'

import { RxCross1 } from "react-icons/rx";

import Comment from './CommentsComponents/Comment.js';

import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import postModal from "../Styles/PostModal.css"


const PostModal = ({}) => {
  
  const {postId} = useParams()
  
  const navigate = useNavigate();

  const [currentPost, setCurrentPost] = useState('')
   



  useEffect(() => {

    const getcurrentSinglePost = async() => {

      try {

        const {data} = await axios.get(`http://localhost:2024/api/v1/hellosocial/posts/get/singlepost/${postId}`, {

          method:"GET",
          headers:{"Content-Type":"application/json"}

        })



        setCurrentPost(data)
 

      } catch (err) {

        console.log(err, 'errrrr')

      }

    }


    getcurrentSinglePost();


 }, [postId])

 let postContent;



  return (

    <div className='modal-overlay-container'>

       <div>

        <span onClick={() => navigate(-1)} className='close'> <RxCross1 /> </span>

       <div className='modal-content-container'>

      
    
         {/*
         <img src={postContent} alt={postContent} className='content'/>
         
         */}
        

        

       </div>

       <div className='post-caption-container'>
     
         <p className='post-caption'>{currentPost?.postCaption}</p>

       </div>

       </div>


 

  <Comment postId={postId} />

  


    </div>


  )


}

export default PostModal