
import * as express from "express"

interface CustomError extends Error {

     statusCode:Number,
     message:string

} 

const createCustomError = (statusCode:number, message:string):CustomError =>{


    const error = new Error(message) as CustomError
    error.statusCode = statusCode;
    error.message = message;
    return error
 

}




const ErrorHandler = (statusCode:number, message:string):CustomError =>{
  
  return createCustomError(statusCode, message)
  
}




 export default ErrorHandler









