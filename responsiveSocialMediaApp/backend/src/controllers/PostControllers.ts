import {Request, NextFunction, Response } from "express";
import { tryCatch } from "../utils/tryCatch";
import postModel from "../models/PostModel";
import ErrorHandler from "../utils/ErrorHandler";
import UserModel from "../models/User";


interface CustomRequest {

    body:any,
    params:string | number,
    query:string | number | boolean 

}


 


export const addCreatePost = tryCatch(async(req:CustomRequest, res:Response, next:NextFunction) =>{

    
    const {postByUser, postContent, postCaption} = req.body.body
    
     if(postByUser !== "" || postContent !== "" || postCaption !== "") {

         const post = await postModel.create({postByUser, postContent, postCaption})

           if(post){

               // after post successfully being created
               
               res.status(200).json({message:"post created"})
               
            }else{
                
                // if failed to post
                
                next(ErrorHandler(501, "facing some issues try later to  post"))
                
            }
          
            
            
            
        }else{
            
            next(ErrorHandler(500, 'please choose something to upload'))
            
        }
        




  
})





export const getSinglePost = tryCatch(async(req:Request, res:Response, next:NextFunction) =>{

   console.log(req.params.postId, 'posss')

  const postId = req.params.postId

    const post = await postModel.findOne({_id:postId}).populate("postByUser")    


    if(post){

     res.status(200).json(post)

    }else{
    
      next(ErrorHandler(401,  "post not found sorry"))

    }

})





export const getPosts = tryCatch(async(req:Request, res:Response, next:NextFunction) =>{

   const posts = await postModel.find({postByUser:req.params.userId}).populate("postByUser")

   res.status(200).json(posts);

})






/// this api below will help in filling
/// user main page with posts 


export const fillUserMainPageWithPost = tryCatch(async(req:Request, res:Response, next:NextFunction) =>{

  const userId = req.params.userId 

  console.log(userId, userId)

   const followedUsers = await UserModel.find({followers:{$elemMatch:{userId:userId}}})
   

if(followedUsers) {
  
 const postsByUsers = await Promise.all(followedUsers.map(async (user) =>{

      const posts = await postModel.find({postByUser:user?._id}).populate("postByUser");

        if(!posts){
            
          return next(ErrorHandler(401, "user needs to follow accounts to see posts"));

          
        }else{

      
         return posts;
          
        }
        
      }))

      


    return res.status(200).json(postsByUsers)

      
    }else{
      
      next(ErrorHandler(401, "user needs to follow accounts"))
      
    }

  })
  
  





  export const postAddRemoveLike = tryCatch(async(req:Request, res:Response, next:NextFunction) =>{

    //console.log(req.body)

    const post = await postModel.findOne({_id:req.params.postId});
    
    console.log(post)

    const postToLike = post?.likes?.find((like) => like.userId === req.body.userId);
   
    if(postToLike){



      const updatedUser = await postModel.findOneAndUpdate({_id: req.params.postId}, {$pull:{likes: { userId: req.body.userId}}}, { new: true });

      console.log('like removed')

      res.status(200).json(false)
      
    }else{
      
      
      const updatedUser = await postModel.findOneAndUpdate({_id: req.params.postId}, {$push:{likes: { userId: req.body.userId}}}, { new: true });
      
      res.status(200).json(true);

      console.log("like added")

    }




  })
 



















