import React, { useEffect, useState } from "react";
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

import axios from "axios"
import { useSelector } from "react-redux";
import RepliedComments from "./RepliedComments";

export default function Comment({ postId }) {


  const currentUser = useSelector((state) => state.helloSocialUser.currentUser);


  const [showRepliesToggle, setShowRepliesToggle] = useState(true);



  const [postComments, setPostComments] = useState([]);


  const [commentText, setCommentText] = useState('');











  useEffect(() => {

    const fetchComments = async () => {

      try {

        const res = await axios.get(`http://localhost:2024/api/v1/hellosocial/comments/get/comments/${postId}`, {

          method: "GET",
          headers: { "Content-Type": "application/json" }

        });



        setPostComments(res.data);




      } catch (err) {

        console.log(err)

      }


    }

    fetchComments()

  }, [postId]);





  const addComments = async (e) => {

    e.preventDefault()

    try {

      const res = await axios.post(`http://localhost:2024/api/v1/hellosocial/comments/add/comment`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        commentText: commentText,
        commentByUser: currentUser?._id,
        postId: postId,

      });

      setPostComments([...postComments, res.data ])

   


    } catch (err) {

      console.log(err)

    }

  }






  return (
    <section className="gradient-custom vh-100 " >
      <MDBContainer className="py-5" style={{ maxWidth: "50rem", }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="10" xl="8">
            <MDBCard>
              <MDBCardBody className="p-4" style={{ height: "60rem", overflow: "scroll", fontSize: "1.8rem" }}>
                <MDBTypography tag="h4" className="text-center mb-4 pb-2" >
                  Nested comments section
                </MDBTypography>

                <form onSubmit={addComments}>

                  <input type="text" placeholder="Add A Comment To This Post" style={{ fontSize: "1rem", width: "16rem", textAlign: "center" }} onChange={(e) => setCommentText(e.target.value)} />

                  <button style={{ fontSize: "1rem", width: "50px" }}>Add</button>

                </form>

                <MDBRow>
                  <MDBCol style={{ background: "red" }}>

                    {postComments.map((comment) => (

                      <>

                        <div className="d-flex flex-start" style={{ background: "green" }} >
                          <MDBCardImage
                            className="rounded-circle shadow-1-strong me-3"
                            src={comment.commentByUser.profileImage}
                            alt={comment.commentByUser.profileImage}
                            width="65"
                            height="65"
                          />

                          <div className="flex-grow-1 flex-shrink-1" >
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                  {comment.commentByUser.userName}
                                  <span className="small">- 2 hours ago</span>
                                </p>
                                <a href="#!">
                                  <MDBIcon fas icon="reply fa-xs" />
                                  <span className="small"> reply</span>
                                </a>
                              </div>
                              <p className="small mb-0">
                                {comment.commentText}
                              </p>
                            </div>

                            {

                              showRepliesToggle ?

                                <RepliedComments postId={postId} commentId={comment?._id} currentUser={currentUser} /> :

                                ""
                            }

                            <div className="d-flex flex-start mt-4">
                              <a className="me-3" href="#">
                                <MDBCardImage
                                  className="rounded-circle shadow-1-strong me-3"
                                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                                  alt="avatar"
                                  width="65"
                                  height="65"
                                />
                              </a>

                              <div className="flex-grow-1 flex-shrink-1">
                                <div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                      John Smith{" "}
                                      <span className="small">- 4 hours ago</span>
                                    </p>
                                  </div>
                                  <p className="small mb-0">
                                    the majority have suffered alteration in some
                                    form, by injected humour, or randomised words.
                                  </p>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div> {/* end*/}
                      </>

                    ))}



                    {/*

                    <div className="d-flex flex-start" style={{background:"yellow"}}>
                      <MDBCardImage
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                        alt="avatar"
                        width="65"
                        height="65"
                      />

                      <div className="flex-grow-1 flex-shrink-1">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                              Maria Smantha{" "}
                              <span className="small">- 2 hours ago</span>
                            </p>
                            <a href="#!">
                              <MDBIcon fas icon="reply fa-xs" />
                              <span className="small"> reply</span>
                            </a>
                          </div>
                          <p className="small mb-0">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page.
                          </p>
                        </div>

                        <div className="d-flex flex-start mt-4">
                          <a className="me-3" href="#">
                            <MDBCardImage
                              className="rounded-circle shadow-1-strong me-3"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp"
                              alt="avatar"
                              width="65"
                              height="65"
                            />
                          </a>

                          <div className="flex-grow-1 flex-shrink-1">
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                  Simona Disa{" "}
                                  <span className="small">- 3 hours ago</span>
                                </p>
                              </div>
                              <p className="small mb-0">
                                letters, as opposed to using 'Content here,
                                content here', making it look like readable
                                English.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-start mt-4">
                          <a className="me-3" href="#">
                            <MDBCardImage
                              className="rounded-circle shadow-1-strong me-3"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                              alt="avatar"
                              width="65"
                              height="65"
                            />
                          </a>

                          <div className="flex-grow-1 flex-shrink-1">
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                  John Smith{" "}
                                  <span className="small">- 4 hours ago</span>
                                </p>
                              </div>
                              <p className="small mb-0">
                                the majority have suffered alteration in some
                                form, by injected humour, or randomised words.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                                */}


















                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}