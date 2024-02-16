

import express from "express"
 
import { addCreatePost, fillUserMainPageWithPost, getPosts, getSinglePost, postAddRemoveLike } from "../controllers/PostControllers";



const postRouter = express.Router()





postRouter.post('/create/addpost', addCreatePost);

postRouter.get('/get/userposts/:userId', getPosts);

postRouter.get('/get/singlepost/:postId', getSinglePost);

postRouter.get('/get/fillmainpage/:userId', fillUserMainPageWithPost);
 
postRouter.put("/update/addorremovelike/:postId", postAddRemoveLike)





export default postRouter




