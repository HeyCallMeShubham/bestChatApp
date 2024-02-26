import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ConversationText = ({ senderId, conversation, currentUser }) => {

    const [user, setUser] = useState(null)


    useEffect(() => {

        const getSingleUser = async () => {

            try {

                const { data } = await axios.get(`http://localhost:2024/api/v1/hellosocial/user/aboutuser/${senderId}`)

                console.log(data.userData, 'datatatattata')

                setUser(data.userData)

            } catch (err) {

                console.log(err)

            }


        }


        getSingleUser();


    }, [currentUser, conversation]);


    return (

        <>

            {currentUser === senderId ? (

                <>

                    <img
                        src={user?.profileImage}
                        alt={user?.profileImage}
                        style={{ width: "40px", height: "90%", borderRadius: "50%" }}
                    />

                    <div>
                        <p
                            className="small p-2 ms-3 mb-1 rounded-3"
                            style={{ backgroundColor: "#f5f6f7" }}
                        >
                            {conversation?.text}
                        </p>
                    </div>


                </>
            ) : (

                <>


                    <div>

                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary" >
                            {conversation?.text}
                        </p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted">
                            77:90
                        </p>

                    </div>



                    <img
                        src={user?.profileImage}
                        alt={user?.profileImage}
                        style={{ width: "45px", height: "100%", borderRadius: "50%" }}
                    />



                </>

            )



            }


        </>


    )
}

export default ConversationText