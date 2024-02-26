import React, { useState } from 'react'

import AddPostModalcss from "../../Styles/AddPostModal.css"

import { FaArrowLeftLong } from "react-icons/fa6";
import AfterSelectingContent from './AfterSelectingContent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const AddPostModal = ({currentUser, setShowPostModal}) => {


  const [selectedContent, setSelectedContent] = useState(null);

  const [postCaption, setPostCaption] = useState("");




  const converToBase64 = (file) =>{

      return new Promise((resolve, reject) =>{

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = () =>{

            resolve(fileReader.result)

        }

        fileReader.onerror = (error) =>{
   
          reject(error)

        }

      })


  }


  const handleFileUpload = async(e) =>{

    const file = e.target.files[0];

    const base64 = await converToBase64(file);

     setSelectedContent(base64)
      

  }



   const addPost = async(e) =>{

   try{
 
    const res = await axios.post('http://localhost:2024/api/v1/hellosocial/posts/create/addpost', {
     
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:{

        postByUser:currentUser?._id,
        postContent:JSON.stringify(selectedContent),
        postCaption:postCaption

    }

    })


    
    if(res){

      alert(res.data.message)
      
      setShowPostModal(false)
    
      
    }


   }catch(err){

    console.log(err)

   }

  }






  return (

    <div className='add-post-modal'>



      <div className='header-box'> {/*Header Box Start*/}

        <span >
        <FaArrowLeftLong style={selectedContent ? {display:"block"} : {display:"none"}}/>
        </span>

         <h2>Create New Post</h2>
         
          <span>

          <h2 onClick={addPost} style={selectedContent ? {display:"block"} : {display:"none"}}>Share</h2>
          
          </span>

      </div> {/*Header-box End*/}

    {!selectedContent ? (

      
           <div className='select-content'>
      
             <input type='file' onChange={(e) => handleFileUpload(e)} />
      
           </div>



    ) : (

       <div style={{height:'92%', width:"100%", background:"white"}} >

      <AfterSelectingContent selectedContent={selectedContent} currentUser={currentUser} setPostCaption={setPostCaption}/>
      
      </div>



    )


    
    }


    </div>
  )
}

export default AddPostModal