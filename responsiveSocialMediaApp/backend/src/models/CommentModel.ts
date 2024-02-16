

import mongoose, { Schema, Document, Model } from "mongoose"




interface commentLikes {

    userId: string

}


interface HelloSocialPostComments {


    commentText: string;
    commentByUser: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    likes: commentLikes[];


}


const commentSchema: Schema<HelloSocialPostComments> = new Schema<HelloSocialPostComments>({


    commentText: { type: String, required: true },
    commentByUser: { type: mongoose.Schema.Types.ObjectId, ref: "socialAppUser", required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "helloSocialUsersPost", required: true },
    likes: [{ userId: String }]


}, { timestamps: true })




const postCommentsModel = mongoose.model("helloSocialUsersPostComments", commentSchema)



export default postCommentsModel





