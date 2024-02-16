
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoute = () =>{



const helloSocialUser = useSelector((state) => state.helloSocialUser.currentUser)

return helloSocialUser ? <Outlet /> : <Navigate to="/login"/>

}



export default ProtectedRoute










