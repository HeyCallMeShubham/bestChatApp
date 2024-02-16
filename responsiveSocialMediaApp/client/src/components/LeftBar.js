import React, { useEffect, useState } from 'react'

import leftbarcss from "../Styles/LeftBar.css"

import { IoSearch } from "react-icons/io5"

import { IoHome } from "react-icons/io5";

import { FaRegCompass } from "react-icons/fa";

import { BsCameraReelsFill } from "react-icons/bs";

import { IoIosNotifications } from "react-icons/io";

import { MdLibraryAdd } from "react-icons/md";

import { SiAxios, SiGooglemessages } from "react-icons/si";
import { GiCrossedSabres } from "react-icons/gi";

import { Link } from 'react-router-dom'

import {useSelector} from "react-redux"

import axios from "axios"
import AddPostModal from './PostComponents/AddPostModal';
 
const LeftBar = () => {

  const [searchInput, setSearchInput] = useState(false);

  const [showPostModal, setShowPostModal] = useState(false);


  const [nameBeingSearched, setNameBeingSearched] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const currentUser = useSelector((state) => state?.helloSocialUser?.currentUser)

  console.log(searchResults, 'results')


  const setSearchToggle = (e) => {

    e.preventDefault()

    setSearchInput(true)


  }


  const ShowPostModalToggle = () =>{

    setShowPostModal(true);


  }






  const iconsOptions = [

    {

      Icon: <IoHome />,
      name: "Home",
      navigateTo: "/",
      dataaftercontent: "Home",

    },


    {

      Icon: <IoSearch />,
      name: "Search",
      onClick: setSearchToggle,
      dataaftercontent: "Search",

    },


    {

      Icon: <FaRegCompass />,
      name: "Explore",
      navigateTo: "/explore",
      dataaftercontent: "Explore"

    },


    {

      Icon: <BsCameraReelsFill />,
      name: "Reels",
      navigateTo: "/reels",
      dataaftercontent: "Reels",

    },


    {

      Icon: <IoIosNotifications />,
      name: "Notifications",
      navigateTo: "/notifications",
      dataaftercontent: "Notifications",

    },


    {

      Icon: <MdLibraryAdd />,
      name: "Add",
      dataaftercontent: "Add",
      onClick:ShowPostModalToggle

    },


    {

      Icon: <SiGooglemessages />,
      name: "Inbox",
      navigateTo: "/direct/inbox",
      dataaftercontent: "Messages",


    },

  ];




 





  useEffect(() => {

  
  const searching = async() =>{

    try{

      const res = await axios.get(`http://localhost:2024/api/v1/hellosocial/user/searchingusers/?username=${nameBeingSearched}`)

      setSearchResults([...res.data])

     console.log(res, 'heleelldee')
       

    }catch(err){

      
      console.log(err)
      
      
    }
    
    
    
  }
  
  searching()
  


  }, [nameBeingSearched])








  return (

    
    <div className='leftBar-main-container'>


      {iconsOptions?.map((option) => (

        <Link to={option?.navigateTo}>

          <div onClick={option?.onClick} key={option?.Icon} className='icon-container'>

            <span className='social-icons' data-after-content={option?.dataaftercontent} >{option?.Icon}</span>

          </div>

        </Link>

      ))

      }


      {searchInput && (

        <div className='search-container'>

          <span className='close-button' onClick={() => setSearchInput(false)}><GiCrossedSabres /></span>

          <form onSubmit={""}>

            <input type='text' placeholder=' Search An Account' onChange={(e) => setNameBeingSearched(e.target.value)} />

            <button type='submit'>Search</button>

          </form>

          <div className='search-related-user-list'>


            {searchResults.length ? searchResults.map((user) => (

              <Link to={`/aboutuser/${user._id}`}>

               <div className='' >

              <h1>{user.userName}</h1>

              </div>
              
              </Link>

            )) : "search users"

            }

          </div>
        </div>

      )



      }


   {showPostModal ? (

    <AddPostModal currentUser={currentUser} setShowPostModal={setShowPostModal} />

   ) : ""

   }

    </div>
  )
}



export default LeftBar