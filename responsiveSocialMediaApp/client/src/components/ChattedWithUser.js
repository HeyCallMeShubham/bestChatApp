import React from 'react'

import chattedwithuser from "../Styles/ChattedWithUser.css"

const ChattedWithUser = () => {

 

    return (

        <div className='wrapper'>

            <img src='https://www.bing.com/th?id=OAIP.fb6818c7bc9ce2ad6165f063bf46dcbe&pid=AdsNative&c=3&w=300&h=157&dynsize=1&qlt=90' className='user-profile-picture' alt='' />

            <h3 className='user-name'>Shubham Kumar</h3>

            <p className='recent-last-text'>Hello Dear <span className='timeBefore'>3w</span></p>

        </div>

    )
}

export default ChattedWithUser