import express, { Request, Response, NextFunction, response } from "express";

import cookieParser from "cookie-parser"

import bodyParser from "body-parser";

import cors from 'cors'

const app = express()

import mongoose, { Callback } from "mongoose"

import multer from "multer"

import dotenv from "dotenv"

import jwt from "jsonwebtoken"


import UserModel from "./models/User"
import { tryCatch } from "./utils/tryCatch";
import ErrorHandler from "./utils/ErrorHandler"
import userRouter from "./routes/UserRoutes";
import { JsonWebTokenError } from "jsonwebtoken";
import verifyToken from "./utils/userVerify";
import postRouter from "./routes/PostRoute";
import { isObjectLiteralElementLike } from "typescript";
import storyRouter from "./routes/storyRoutes";
import commentRouter from "./routes/CommentRoutes";


mongoose.connect("mongodb+srv://shubham:mylife@cluster0.natwega.mongodb.net/")






dotenv.config()





app.use(cors({

    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}));





app.use(bodyParser.json({limit:"50mb"}));

app.use(cookieParser());

app.use("/api/v1/hellosocial/user", userRouter);
app.use("/api/v1/hellosocial/posts", postRouter);
app.use("/api/v1/hellosocial/story", storyRouter);
app.use("/api/v1/hellosocial/comments", commentRouter);

app.use(bodyParser.urlencoded({limit:"50mb",extended: true }));



















app.listen(2024, () => {

    console.log('app is listening on 2024')
    
    
})















































{/*



const verify = (req:any, res:any) => {


    try {

        const accessToken = req.cookies.helloSocialAppAccessToken


        if (!accessToken) {

            const refreshToken = req.cookies.helloSocialAppRefreshToken

            if (refreshToken) {
                
                

                const secretKey: string = "motabhaibhaibhai"
                type payload = {
                    
                    userId: any,
                    username: string,
                    email: string
                    
                }

                jwt.verify(refreshToken, secretKey, (err: any, decoded: any) => {

                    const jwtPayload: payload = {

                        userId: decoded.userId,
                        username: decoded.username,
                        email: decoded.email

                    };


                    const accessToken = jwt.sign(jwtPayload, secretKey, { expiresIn: '1h' });

                    
                    
                    type httpOptions = {
                        
                        maxAge: number,
                        httpOnly: boolean,
                        secure: boolean,
                        
                    };
                    
                    
                    
                    const httpOnlyOption: httpOptions = {
                        
                        maxAge: 36000000,
                        httpOnly: false,
                        secure: false,
                        
                    };
                    
                    
                    res.cookie("helloSocialAppAccessToken", accessToken, httpOnlyOption);
                    
                    
                })


            } else {
                
                console.log(accessToken, 'accesstoken')
                
            }

        } else {

            
            console.log('valid user')
            
            //  res.status(200).json({message:"validToken"})


        }

    } catch (err) {

        console.log(err)
        
    }
    
    
    
}


app.get('/helllo', verify, (req, res) =>{
    
    console.log('hhheehheehhehhehe')
    
    
})


*/}



{/*

    interface CustomRequest extends Request {
     
        
        email?:string
        
    }
    
    
       
       const verifyUser = (req:CustomRequest, res:Response, next:NextFunction) =>{
        
           
           const accessToken = req.cookies.helloSocialAppAccessToken;
        
           
           if(!accessToken){
               
               
               if(renewToken(req, res, next)){
     
                   next()
                   
                }
                
                
            }else{
            
            const secretKey: string = "motabhaibhaibhai"
    
            jwt.verify(accessToken, secretKey, (err:any, decoded:any) =>{
    
                if(err){
    
                    console.log('invalid user', err)
                    
                    return next(ErrorHandler(401, 'invalid accessToken'))
                    
                }else{
                    
                    console.log(decoded, 'accessToken');
                    
                    req.email = decoded.email
                    
                    next();
                    
                }
    
           })
           
        }
        
    };
    
    
    
    
    
    
    const renewToken = (req:CustomRequest, res:Response, next:NextFunction) =>{
        
        
        const refreshToken = req.cookies.helloSocialAppRefreshToken
    
    
        let exists = false
        
        
        if(!refreshToken){
            
            
            return next(ErrorHandler(401, "UnAuthorisedUser"))
            
            
        }else{
            
            
            const secretKey: string = "motabhaibhaibhai"
            
            
            jwt.verify(refreshToken, secretKey, (err:any, decoded:any) =>{
                
                
                if(err){
                    
                    
                    console.log('invalid user', err);
                    
                    
                    return next(ErrorHandler(401, 'invalid refreshToken'))
                    
                    
                }else{
                    
                    
                    const secretKey: string = "motabhaibhaibhai"
                    
                    
                    const accessToken = jwt.sign({email:decoded.email}, secretKey, { expiresIn: '1h' });
                    
                    
                    
                    type httpOptions = {
                        
                        maxAge: number,
                        httpOnly: boolean,
                        secure: boolean,
                        
                    };
    
    
    
                    const httpOnlyOption: httpOptions = {
    
                        maxAge: 3600000000,
                        httpOnly: true,
                        secure: false,
                        
                    };
                    
                    
                    
                    res.cookie("helloSocialAppAccessToken", accessToken, httpOnlyOption);
                    
                    exists = true
    
                }
                
           })
    
        }
    
        return exists
        
    }
    
    
    
    */}
