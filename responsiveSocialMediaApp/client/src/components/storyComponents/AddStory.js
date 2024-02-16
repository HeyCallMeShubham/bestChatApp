import axios from 'axios';
import React, { useRef, useState } from 'react'
import { FaPlus } from "react-icons/fa";

const AddStory = ({currentUser}) => {


    const [selectedContent, setSelectedContent] = useState(null);


    const fileInputRef = useRef(null)




    const converToBase64 = (file) => {

        return new Promise((resolve, reject) => {

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = () => {

                resolve(fileReader.result)

            }

            fileReader.onerror = (error) => {

                reject(error)

            }

        })


    }


    const handleFileUpload = async (e) => {

        const file = e.target.files[0];

        const base64 = await converToBase64(file);

        setSelectedContent(base64)


    }



    const addStory = async (e) => {

        try {

            const res = await axios.post('http://localhost:2024/api/v1/hellosocial/posts/create/addpost', {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: {

                    //  storyByUser:currentUser?._id,
                    storyContent: JSON.stringify(selectedContent),


                }

            })



            if (res) {

                alert(res.data.message)

                ///     setShowPostModal(false)


            }


        } catch (err) {

            console.log(err)

        }

    }



    const handleAddStoryClick = () => {

        fileInputRef.current.click()

    }


    const addStories = async () => {

        try {

            const res = await axios.post(`http://localhost:2024/api/v1/hellosocial/story/create/add/story`, {

                method:"POST",
                headers:{"Content-type": "application/json" },
                storyByUser: currentUser?._id,
                storyContent: selectedContent,


            })


        } catch (err) {

            console.log(err)

        }

    }




    return (
        <div style={{ position: "absolute" }}>

            <FaPlus className='add-story-icon' onClick={handleAddStoryClick} />

            <input ref={fileInputRef} onChange={(e) => handleFileUpload(e)} type="file" style={{ display: 'none' }} />


            {selectedContent ? (

                <div>

                    <button onClick={addStories}>Add Story</button>

                    <img src={selectedContent} alt={selectedContent} style={{ height: "100%" }} />


                    <div className='after-selecting-content-for-story' style={{ height: "990px", position: "absolute" }}>


                    </div>



                </div >


            ) : (<p style={{ marginTop: "0.4rem" }}>Add Story</p>)}

        </div >
    )
}

export default AddStory