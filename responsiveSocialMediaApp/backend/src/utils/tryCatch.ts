
import {Request, Response, NextFunction} from "express"


export const tryCatch = (controller:any) => async(req:Request, res:Response, next:NextFunction) =>{

   try{

    await controller(req, res, next)

   }catch(err){

    console.log(err)

    return next(next)

   }


}










