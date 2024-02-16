
import mongoose, { Model, Schema } from "mongoose"






interface ILikes {
        
  userId:string
  
}

interface iShares {
 
userId:string

}

interface IViewers {
 
userId:string

}




 interface storyFieldsTs {

    storyContent:string,
    storyByUser:mongoose.Types.ObjectId,
    expirationDateTime:Date,
    viewers:IViewers[];
    likes:ILikes[];
    shares:iShares[];

 }



 const storySchema: Schema<storyFieldsTs> = new Schema<storyFieldsTs>({

   
   storyContent:{type:String, required:true},
   storyByUser:{type:mongoose.Schema.ObjectId, ref:"socialAppUser", required:true},
   expirationDateTime:{type:Date, required:true},
   viewers:[{userId:String}],
   likes:[{userId:String}],
   shares:[{userId:String}]


 }, {timestamps:true}); 





const storyModel =  mongoose.model('helloSocialUsersStorie', storySchema)

 

export default storyModel

