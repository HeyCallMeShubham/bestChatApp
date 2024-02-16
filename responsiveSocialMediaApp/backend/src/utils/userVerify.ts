import jwt  from 'jsonwebtoken'
import {Request, Response, NextFunction} from "express"
import cookieParser from "cookie-parser"
import ErrorHandler from "./ErrorHandler"
import { tryCatch } from './tryCatch'

interface CustomRequest {

  user:any,
  cookies:any
   
}


  const verifyToken = tryCatch(async(req:CustomRequest, res:Response, next:NextFunction) =>{

    
    
    const token = req.cookies.helloSocialAppRefreshToken



      if(!token) {
    
        return next(ErrorHandler(401,"unauthorised user please.... login first...."));
      
      }
      
      
      const secretKey: string = "motabhaibhaibhai"



       jwt.verify(token, secretKey, (err:any, user:any) =>{
     
       if(err) return next(ErrorHandler(401,'token not valid'))
     
       req.user = user

       console.log(req.user)
     
        next();

      })

})





export default  verifyToken

