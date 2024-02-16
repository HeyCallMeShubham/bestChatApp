import express from "express"
import { AddReplyToComment, addComment, getPostAllComments, getRepliedComments } from "../controllers/CommentController"



const commentRouter = express.Router()



commentRouter.post("/add/comment", addComment);
commentRouter.get("/get/comments/:postId", getPostAllComments);





// reply Comment Routes 



commentRouter.post("/add/replycomment", AddReplyToComment);

commentRouter.get("/get/repliedcomments/:postId/:commentId", getRepliedComments);








export default commentRouter