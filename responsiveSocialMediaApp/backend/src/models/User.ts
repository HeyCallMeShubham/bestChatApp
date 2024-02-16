
import mongoose, { Schema } from "mongoose"

import jwt from "jsonwebtoken"



interface IFollowers {
        
    userId:string
    
}

interface IFollowings {
   
  userId:string

}


interface userSchemaFields {

    
    userName:string,
    email:string,
    phone:number,
    userBio:string,
    followers:IFollowers[],
    following:IFollowings[],
    password:string,
    profileImage:string,


} 







const userSchema: Schema<userSchemaFields> = new Schema<userSchemaFields>({
    
    

    userName:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:Number, required:true},
    userBio:{type:String, default:"hello my name"},
    followers:[{userId:String}],
    following:[{userId:String}],
    password:{type:String, required:[true, 'Password Is Required']},
    profileImage:{type:String},


}, {timestamps:true})





const UserModel =  mongoose.model("socialAppUser", userSchema)



export default UserModel






{/*

const userSchema = new mongoose.Schema({


    userName:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:Number, required:true},
    userBio:{type:String, default:"hello my name"},
    followers:[{userId:String}],
    following:[{userId:String}],
    password:{type:String, required:[true, 'Password Is Required']},
    profileImage:{type:String},


}, {timestamps:true})


*/}
