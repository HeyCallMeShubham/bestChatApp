
import mongoose, {Schema, Document, Model} from "mongoose"




  interface ILikes {
        
      userId:string
      
  }

  interface iShares {
     
    userId:string

  }




  interface helloSocialPost extends Document {


      postByUser:mongoose.Types.ObjectId;
      postContent:string;
      postCaption:string;
      likes:ILikes[];
      shares:iShares[];
      
      
      
  }    

const postSchema: Schema<helloSocialPost> = new Schema<helloSocialPost>({

    
    postByUser:{type:mongoose.Schema.ObjectId, ref:"socialAppUser", required:true},
    postContent:{type:String, required:true},
    postCaption:{type:String, required:true},
    likes:[{userId:String}],
    shares:[{userId:String}],


}, {timestamps:true})




const postModel = mongoose.model("helloSocialUsersPost", postSchema)



export default postModel

















 