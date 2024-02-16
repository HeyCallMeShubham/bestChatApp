import React, { useEffect, useState } from 'react'

import aboutProfilecss from "../Styles/AboutProfile.css"

import axios from 'axios'

import { useSelector } from "react-redux"

import { Link, useNavigate, useParams } from "react-router-dom"
import { IoSettingsSharp } from "react-icons/io5";
const AboutProfile = () => {

  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.helloSocialUser.currentUser)

  const { userId } = useParams();




  const followUnfollowApi = async () => {



    try {

      axios.defaults.withCredentials = true

      const res = await axios.put(`http://localhost:2024/api/v1/hellosocial/user/updatefollower/${userId}`, {

        method: "PUT",
        headers: { "Content-Type": "Application/json" },
        userId: currentUser._id

      })



    } catch (err) {


      console.log(err);


    }


  }

  /// const [aboutUser, {data:userData, isLoading:userDataLoading, isSuccess:Success, error:userError }] = useLazyAboutUserQuery("")


  useEffect(() => {

    const getSingalUser = async () => {

      try {

        const res = await axios.get(`http://localhost:2024/api/v1/hellosocial/user/aboutuser/${userId}`)


        setUser(res.data.userData)


      } catch (err) {

        console.log(err)

      }



    }

    getSingalUser()


  }, [userId])




  useEffect(() => {

    const getUserPosts = async () => {

      try {

        const posts = await axios.get(`http://localhost:2024/api/v1/hellosocial/posts/get/userposts/${user._id}`, {

          method: "GET",
          headers: { "Content-Type": "application/json" }

        })

        console.log(JSON.parse(posts.data[0].postContent))

        setUserPosts(posts.data);


      } catch (err) {

        console.log(err)

      }


    }


    getUserPosts();


  }, [user])




  return (


    <div className='main-about-page-container'>



      <div className='userBio-userName-followers-etc-container'>

        <div className='profile-image-container'>

          <img src={"https://th.bing.com/th?id=OPAC.Iw1xNpkR4Bu3RQ474C474&o=5&pid=21.1&h=224&w=268&c=17&rs=1"} className='profileImage' alt='https://img-getpocket.cdn.mozilla.net/296x148/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F8e8d5469-b6c4-4760-bd08-468b4a319317.jpeg' />

        </div>



        <div className='texts-container'>

          <div className='userName-and-EditSetting-Btn-container' >

            <h2>{user.userName}</h2>

            {user._id === currentUser._id ? (
              <>
                <button className='Edit-Profile-btn'>Edit Profile</button>
                <span className='settings-btn'><IoSettingsSharp /></span>
              </>

            ) : ""

            }



          </div>




          <ul>

            <li className='post-length text1'>{userPosts.length} Posts</li>
            <li className='user-followers text1'>{user?.followers?.length} Followers</li>
            <li className='following-accounts-by-user text1'>{user?.following?.length} Following</li>

          </ul>


          <p className='user-bio'>{user.userBio}</p>



          <button>Message</button>


          {user?.followers?.find((userId) => userId.userId === "65c5cd5ff0fdf597ab48ab43") ? (



            <button onClick={followUnfollowApi}>Unfollow</button>



          ) : (



            <button onClick={followUnfollowApi}>Follow</button>



          )


          }


        </div>


        {/*Posts section*/}


        <div className='user-content-container'>

          {userPosts.length ? userPosts.map((post) => (

            <div className='postcard'>

              <h1>{post.postCaption}</h1>

              <img src={JSON.parse(post.postContent)} alt={JSON.parse(post.postContent)} />

            </div>

          )) : ''



          }

        </div>


      </div>

    </div>
  )
}

export default AboutProfile



























