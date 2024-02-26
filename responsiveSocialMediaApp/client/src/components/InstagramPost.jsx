// InstagramPost.js
import React, { useEffect, useState } from 'react';

import instagramcss from "../Styles/Instagrampost.css"
import { Link, useNavigate } from "react-router-dom"
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import axios from 'axios';



const InstagramPost = ({ post, currentUser }) => {

  const [currentPost, setCurrentPost] = useState(null)
  const [postLiked, setPostLiked] = useState(false);

  const liked = post.likes.find((like) => like.userId === currentUser?._id)

  
 useEffect(() => {

    const getcurrentSinglePost = async() => {

      try {

        const {data} = await axios.get(`http://localhost:2024/api/v1/hellosocial/posts/get/singlepost/${post?._id}`, {

          method:"GET",
          headers:{"Content-Type":"application/json"}

        })



        setCurrentPost(data);


      } catch (err) {

        console.log(err, 'errrrr')

      }

    }


    getcurrentSinglePost();


 }, [currentUser, post, postLiked])
  
  
   
     const addRemoveLike = async (e) => {
   
       try {
   
         const data = await axios.put(`http://localhost:2024/api/v1/hellosocial/posts/update/addorremovelike/${post?._id}`, {
   
           method: "PUT",
           headers: { "Content-type": "application/json" },
           userId: currentUser?._id
   
         });


         setPostLiked(data.data);

         if(data.data === true){

          return liked = true

         }else{
     
          return liked = false

         }
        
   
       } catch (err) {
   
         console.log(err);
   
       }
   
   
     }




  return (

    <div className="instagram-post" key={post?._id}>

      <div className="post-header">
        <Link to={`/aboutuser/${post?.postByUser?._id}`}>
        <img
          className="user-avatar"
          src={post?.postByUser?.profileImage}
          alt="User Avatar"
        />
        </Link>

        <Link to={`/aboutuser/${post?.postByUser?._id}`}>
        
        <span className="username">{post?.postByUser?.userName}</span>

        </Link>


      </div>

      <div className="post-image">

     <img src={JSON.parse(post?.postContent)} alt={post?.postContent} />  
      </div>

      <div className="post-content">

        <span onClick={addRemoveLike}>{postLiked || liked ? <AiFillLike /> : <BiLike />} {post?.likes?.length}</span>

        {/*<BiSolidLike />*/}

        <Link to={`/${post?._id}/postdetail`}>

          <span>{<FaRegCommentAlt />}</span>

        </Link>

        <span>{<CiShare2 />} {post?.shares?.length}</span>

      </div>

      <p>{post?.postCaption}</p>

    </div>



  );
};

export default InstagramPost;
