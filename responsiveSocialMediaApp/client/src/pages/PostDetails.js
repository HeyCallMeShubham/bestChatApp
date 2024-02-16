import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from "axios"
import PostModal from '../components/PostModal.js';


import postdetails from '../Styles/PostDetails.css';

const PostDetails = () => {

    const {postId} = useParams();

    const [showModal, setShowModal] = useState(true);

    const [currentPost, setCurrentPost] = useState({});

  

    const posts = [

      {
        _id:'98jaiaaffjsjkfkjkfjkjf',
       postedByUserId:"7898765787678",
       caption:"hello this is my first post",
       content:'https://img-getpocket.cdn.mozilla.net/218x109/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F7e9e6c3d-93e1-4319-91b8-e78e3f2e0000.jpeg',
       likes:[1,2,4,5,6,5,6,5,3,2,6,7,7,5,4],
       shares:[1,2,4,5,6,5,6,5,3,2,6,7,7,5,4],
  
      },
  
      {
       _id:'986gyh8jiokkk3ref',
       postedByUserId:"7898765787678",
       caption:"hello this is my second post",
       content:'https://img-getpocket.cdn.mozilla.net/218x109/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F39351108-4a6b-4615-9e3c-61108ef735aa.jpeg',
       likes:[1,2,4,5,6,5,6,5,3,2,6,7,7,5,4],
       shares:[1,2,4,5,6,5,6,5,3,2,6,7,7,5,4],
  
      },
  
      {
       _id:'986gyh8jiokkk3ref',
       postedByUserId:"7898765787678",
       caption:"hello this is my first post",
       content:'https://www.bing.com/th?id=OADD2.8315118802052_1K6BE174Q4ZSPCHKA4&pid=21.2&c=16&roil=0&roit=0.2383&roir=1&roib=0.7617&w=300&h=157&dynsize=1&qlt=90',
       likes:[1,2,4,5,6,5,6,5,3,2,6,7,7,5,4],
       shares:[1,2,4,5,6,5,6,5,3,2,6,7,7,5,4],
  
      },
  
      {
       _id:'986gyh8jiokkk3ref',
       postedByUserId:"7898765787678",
       caption:"hello this is my first post",
       content:'https://www.bing.com/th?id=OADD2.8315118802052_1K6BE174Q4ZSPCHKA4&pid=21.2&c=16&roil=0&roit=0.2383&roir=1&roib=0.7617&w=300&h=157&dynsize=1&qlt=90',
       likes:[1,2,4,5,6,5,6,5,3,2,6,7,7,5,4],
       shares:[1,2,4,5,6,5,6,5,3,2,6,7,7,5,4],
  
      },
  
      {
       _id:'986gyh8jiokkk3ref',
       postedByUserId:"7898765787678",
       caption:"hello this is my first post",
       content:'https://www.bing.com/th?id=OADD2.8315118802052_1K6BE174Q4ZSPCHKA4&pid=21.2&c=16&roil=0&roit=0.2383&roir=1&roib=0.7617&w=300&h=157&dynsize=1&qlt=90',
       likes:[1,2,4,5,6,5,6,5,3,2,6,7,7,5,4],
       shares:[1,2,4,5,6,5,6,5,3,2,6,7,7,5,4],
  
      },
  
  
     ]
     
     
     {/*



    
     useEffect(() =>{
 
 
         const fetchCurrentPostDetails = async() =>{
 
 
             try{
     
                 const {data} = await axios.get(`http://localhost:4877/post/getcurrentpost/${postId}`, {
     
                   method:"GET",
                   headers:{'Content-Type':"application/json"}
     
                 });
     
                 console.log(data, 'currentPost');
              
                 setCurrentPost(data);
     
     
             }catch(err){
     
              console.log(err);
     
             }
     
             }
     
             fetchCurrentPostDetails();
     
             setShowModal(true)
 
             
     }, [])

    
    
    */} 


    
    console.log('postId', currentPost)
    
    const currentPoss = posts.filter((post) => post._id === postId)


  
  return (
    
    <div className='post-overlay'>


      {showModal && <PostModal currentPost={currentPoss}/>}


    </div>


  )
}

export default PostDetails