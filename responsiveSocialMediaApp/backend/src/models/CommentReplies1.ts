
 

import mongoose, {Schema, Document, Model} from "mongoose"



interface commentLikes {
        
    userId:string
    
}

interface helloSocialPostCommentReplies {

    commentText:string;
    commentByUser:mongoose.Types.ObjectId;
    postId:mongoose.Types.ObjectId;
    replyToCommentId:mongoose.Types.ObjectId;
    likes:commentLikes[];


}





const commentRepliesSchema:Schema<helloSocialPostCommentReplies> = new Schema<helloSocialPostCommentReplies>({
    
    
    commentText:{type:String, required:true},
    commentByUser:{type:mongoose.Schema.Types.ObjectId, ref:"socialAppUser", required:true},
    postId:{type:mongoose.Schema.Types.ObjectId, ref:"helloSocialUsersPost", required:true},
    replyToCommentId:{type:mongoose.Schema.Types.ObjectId, ref:"helloSocialUsersPostComments", required:true},
    likes:[{userId:String}]


}, {timestamps:true})




const commentRepliesModel = mongoose.model("helloSocialUsersCommentReplies", commentRepliesSchema)


export default commentRepliesModel







