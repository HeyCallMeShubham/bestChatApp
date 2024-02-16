import React, { useState } from 'react';
import { useRegisterUserMutation } from '../features/rtkQuery/RegisterUser';
import registerPagecss from "../Styles/RegisterPage.css"



const Register = () => {


    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [profileImage, setProfileImage] = useState([""]);



    const converToBase64 = (file) =>{

        return new Promise((resolve, reject) =>{

          const fileReader = new FileReader();

          fileReader.readAsDataURL(file);

          fileReader.onload = () =>{

              resolve(fileReader.result)

          }

          fileReader.onerror = (error) =>{
     
            reject(error)

          }

        })


    }


    const handleFileUpload = async(e) =>{
 
      const file = e.target.files[0];

      const base64 = await converToBase64(file);

       setProfileImage([base64])
        

    }





    const [registUser, { isLoading, isSuccess, error }] = useRegisterUserMutation()

    const registerUserData = {

        userName,
        email,
        password,
        phone,
        profileImage: "hhhhhh"

    }


    if (isLoading) {

        console.log(isLoading, "is loadding")

    }

    if (isSuccess) {

        console.log('hello is success', isSuccess)

    }

    if (error) {

        console.log('is error', error.data);

    }


    const handleSubmit = (e) => {


        e.preventDefault();

        registUser(registerUserData);

    };





    return (
         

        <div className='register-main-container'>


          <div className='registermain-child'>


            <img src={profileImage} alt="https://th.bing.com/th/id/OIP.DxpcKmgZZtv0kMLJpaTJLgHaHa?w=187&h=186&c=7&r=0&o=5&pid=1.7"/>

            <form onSubmit={handleSubmit}>

            <h2>Register</h2>
                
                
                
                    <label>User Name:</label>
                    <input type="text" name="userName" className='user-input' value={userName} onChange={(e) => setUserName(e.target.value)} />
                
                

                    <label>Email:</label>
                    <input type="email" name="email"  className='user-email'value={email} onChange={(e) => setEmail(e.target.value)} />
                
                
                
                    <label>Phone:</label>
                    <input type="tel" name="phone"  className='user-phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                
                


                    <label>Password:</label>
                
                    <input type="password" name="password" className='user-password' value={password} onChange={(e) => setPassword(e.target.value)} />
                
                

+
                
                
                    <label>Profile Image:</label>

                    <input type="file" name="profileImage" className='user-profileImage' accept=".jpg, .png, .jpg" onChange={(e) => handleFileUpload(e)} />
                
                



                <button type="submit">Register</button>



            </form>


        </div>


  </div>


    );
};

export default Register;
