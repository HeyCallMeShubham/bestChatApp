import React, { useState } from 'react';
import { useLoginUserMutation } from '../features/rtkQuery/LoginUserRtk';
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux"

import { signInSuccess } from '../features/Slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const redirect = useNavigate()



    const [loginUser, { data: loginData, isLoading: loginLoading, isSuccess: loginSuccess, error: loginError }] = useLoginUserMutation()

    const dispatch = useDispatch();


    const loginUserData = {

        email,
        password,

    }



    const handleSubmit = async (e) => {

        e.preventDefault();

        loginUser(loginUserData);

    };





    if (loginLoading) {

        console.log(loginLoading, "is loadding")

    }






    if (loginSuccess) {

        console.log('you have logged in successfully')

    }





    if (loginError) {

        console.log('is error', loginError);

    }




    if (loginData) {

        console.log("data", loginData);

        dispatch(signInSuccess(loginData.userdata))

        redirect("/")

     //   localStorage.setItem("helloSocialAppAccessToken", JSON.stringify(loginData.accessToken))

    }




    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>



                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>


                <button type="submit">Login</button>



            </form>
        </div>
    );
};

export default Login;










