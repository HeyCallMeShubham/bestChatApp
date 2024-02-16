import React from 'react'

import comments from '../Styles/Comments.css'

const Comments = () => {
    return (
        <div className='comments-section'>

            <form>

                <input type="text" placeholder='Write A Comment ' />

                <button>Add</button>


            </form>


            <div className='comments-container'>

                <div className='comment-card'>

                    <img src='https://img-getpocket.cdn.mozilla.net/218x109/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fb3876095-0965-49e2-b14b-45148c153fa4.jpeg' alt=''/>

                    <p>Shubham</p>

                    <p>Hello Dear Everyortewwwwwwwwwwwwwwwwwwwfne buuuggggggggggggggggggggggggggggggggggggggggggftrerweeeeeeeeeeeeeeeeeeuuulhyfudddddddddddddddddddddddddddddnxjck vjbjhfgyrjidmkkkkkkkkkkkkkkkkkkkkkkthis post is really amazing and fantastic</p>

                      <span className='like-btn btn'>Like</span>
                      <span className='comment-btn btn'>Comment</span>
                      <span className='reply-btn btn'>reply</span>

                    {true ? (

                        <div className='comment-card'>

                            <form>

                                <input type="text" placeholder='Write A Comment ' />

                                <button>Add</button>


                            </form>


                        </div>


                    ) : (

                        <>

                            <p>be The First One to rpely Him</p>


                        </>


                    )}


                </div>

                <div className='comment-card'>

                    <img src='https://img-getpocket.cdn.mozilla.net/218x109/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fb3876095-0965-49e2-b14b-45148c153fa4.jpeg' alt=''/>

                    <p>Shubham</p>

                    <p>Hello Dear Everyortewwwwwwwwwwwwwwwwwwwfne buuuggggggggggggggggggggggggggggggggggggggggggftrerweeeeeeeeeeeeeeeeeeuuulhyfudddddddddddddddddddddddddddddnxjck vjbjhfgyrjidmkkkkkkkkkkkkkkkkkkkkkkthis post is really amazing and fantastic</p>

                      <span className='like-btn btn'>Like</span>
                      <span className='comment-btn btn'>Comment</span>
                      <span className='reply-btn btn'>reply</span>

                    {true ? (

                        <div className='comment-card'>

                            <form>

                                <input type="text" placeholder='Write A Comment ' />

                                <button>Add</button>


                            </form>


                        </div>


                    ) : (

                        <>

                            <p>be The First One to rpely Him</p>


                        </>


                    )}


                </div>


                <div className='comment-card'>

                    <img src='https://img-getpocket.cdn.mozilla.net/218x109/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fb3876095-0965-49e2-b14b-45148c153fa4.jpeg' alt=''/>

                    <p>Shubham</p>

                    <p>Hello Dear Everyortewwwwwwwwwwwwwwwwwwwfne buuuggggggggggggggggggggggggggggggggggggggggggftrerweeeeeeeeeeeeeeeeeeuuulhyfudddddddddddddddddddddddddddddnxjck vjbjhfgyrjidmkkkkkkkkkkkkkkkkkkkkkkthis post is really amazing and fantastic</p>

                      <span className='like-btn btn'>Like</span>
                      <span className='comment-btn btn'>Comment</span>
                      <span className='reply-btn btn'>reply</span>

                    {false ? (

                        <div className='comment-card'>

                            <form>

                                <input type="text" placeholder='Write A Comment ' />

                                <button>Add</button>


                            </form>


                        </div>


                    ) : (

                        <>

                            <p>be The First One to rpely Him</p>


                        </>


                    )}


                </div>




            </div>


        </div>
    )
}

export default Comments