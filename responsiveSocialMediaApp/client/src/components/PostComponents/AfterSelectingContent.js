import React from 'react'

const AfterSelectingContent = ({selectedContent, currentUser, setPostCaption}) => {
  return (
    <div className='content-add-info' style={{display:"flex", width:"100%", height:"100%"}}>

     <div className='selected-content-div' style={{width:"50%", border:"solid 2px red", alignItems:"center"}}>

     <img src={selectedContent} alt={selectedContent} style={{ width:"100%",height:"100%"}}/>

     </div>
     
     <div className='add-caption-info-about-post' style={{width:"50%", height:"100%", border:"solid 2px green"}}>

      <h1>{currentUser.userName}</h1>

     <textarea onChange={(e) => setPostCaption(e.target.value)} style={{width:"100%", height:"20rem", fontSize:"2rem", padding:"6px 16px"}} placeholder='Enter Caption About Post'>


     </textarea>

     </div>


    </div>
  )
}

export default AfterSelectingContent