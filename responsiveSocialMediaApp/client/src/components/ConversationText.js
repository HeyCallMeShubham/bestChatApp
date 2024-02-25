import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ConversationText = ({senderId, conversation}) => {

    const [user, setUser] = useState(null)


    useEffect(() =>{

    const getSingleUser = async() =>{
     
        try{

          const {data} = await axios.get(`http://localhost:2024/api/v1/hellosocial/user/aboutuser/${senderId}`) 

          console.log(data.userData, 'datatatattata')

          setUser(data.userData)

        }catch(err){

            console.log(err)

        }


    }


    getSingleUser();


    }, [])


    return (

        <div>

            <img
                src={user?.profileImage}
                alt={user?.profileImage}
                style={{ width: "40px", height: "90%", borderRadius:"50%" }}
            />
            <div>
                <p
                    className="small p-2 ms-3 mb-1 rounded-3"
                    style={{ backgroundColor: "#f5f6f7" }}
                >
                  {conversation?.text}
                </p>
            </div>

        </div>

    )
}

export default ConversationText