import { NextFunction, Request, Response } from "express";
import { tryCatch } from "../utils/tryCatch";
import postCommentsModel from "../models/CommentModel";
import ErrorHandler from "../utils/ErrorHandler";
import commentRepliesModel from "../models/CommentReplies1";




export const addComment = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    console.log('addddddd', req.body)

    const {
        commentText,
        commentByUser,
        postId,
    } = req.body


    const comment = await postCommentsModel.create({

        commentText: commentText,
        commentByUser: commentByUser,
        postId: postId

    });

    if (comment) {

        return res.status(200).json(comment)

    } else {

        next(ErrorHandler(400, "server Error Couldnt post the Comment"))

    }


})



export const getPostAllComments = tryCatch(async (req: Request, res: Response, next: NextFunction) => {



    const comments = await postCommentsModel.find({ postId: req.params.postId }).populate("commentByUser")

    if (comments) {

        return res.status(200).json(comments)


    } else {


        next(ErrorHandler(401, "sorry couldnt find comments"))

    }

})


















//// reply comments controllers




export const AddReplyToComment = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body, 'dataa')
    
    const {

        commentText,
        commentByUser,
        postId,
        replyToCommentId,

    } = req.body


    const comment = await commentRepliesModel.create({
        commentText,
        commentByUser,
        postId,
        replyToCommentId
    });




    if (comment) {

        res.status(200).json(comment)

        console.log('replyAddedSuccessfully')

    }else{

        next(ErrorHandler(400, 'couldnt post comment'))

    };

})



export const getRepliedComments = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    const comments = await commentRepliesModel.find({$and:[{postId:req.params.postId},{replyToCommentId:req.params.commentId}]}).populate("commentByUser");

    if (comments) {

        res.status(200).json(comments)

    } else {

        next(ErrorHandler(401, "no replied comments found "))

    }


})









