import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

const RepliedComments = ({ postId, commentId, currentUser }) => {

    const [commentText, setCommentText] = useState("");



    const [repliedComments, setRepliedComments] = useState([]);

    useEffect(() => {


        const showCommentreplies = async (e) => {

            try {

                const res = await axios.get(`http://localhost:2024/api/v1/hellosocial/comments/get/repliedcomments/${postId}/${commentId}`, {

                    method: "GET",
                    headers: { "Content-Type": "application/json" }

                });


        

                setRepliedComments(res.data)


            } catch (err) {

                console.log(err)

            }


        }


        showCommentreplies();



    }, [postId, commentId])



    const addReply = async (e) => {

        e.preventDefault()

        try {

            const { data } = await axios.post(`http://localhost:2024/api/v1/hellosocial/comments/add/replycomment`, {

                method: "POST",
                headers: {'Content-type':"application/json" },
                commentByUser:currentUser?._id,
                commentText:commentText,
                replyToCommentId:commentId,
                postId:postId

            });

        
            setRepliedComments([...repliedComments, data])


        } catch (err) {

            console.log(err)

        }



    }





    return (
        <div>

            <form onSubmit={addReply}>

                <input type="text" placeholder='write a reply ' onChange={(e) => setCommentText(e.target.value)} />

                <button type='submit'>Add</button>

            </form>

            {repliedComments.length ? repliedComments.map((comment) => (


                <div key={comment?._id} className="d-flex flex-start mt-4" style={{ background: "yellow" }}>
                    <a className="me-3" href="#">
                        <MDBCardImage
                            className="rounded-circle shadow-1-strong me-3"
                            src={comment?.commentByUser?.profileImage}
                            alt={comment?.commentByUser?.profileImage}
                            width="65"
                            height="65"
                        />
                    </a>

                    <div className="flex-grow-1 flex-shrink-1">
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                    {comment?.commentByUser?.userName}
                                    <span className="small">- 3 hours ago</span>
                                </p>
                            </div>
                            <p className="small mb-0">
                                {comment?.commentText}
                            </p>
                        </div>
                    </div>
                </div>



            )) : ""


            }




        </div>
    )
}

export default RepliedComments