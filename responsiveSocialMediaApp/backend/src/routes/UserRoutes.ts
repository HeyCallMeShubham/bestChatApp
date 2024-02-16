

import express from "express"
import { Login, Register, getUserById, searchUsers, updateUserFollowers } from "../controllers/UserControllers"



const userRouter = express.Router()





userRouter.post('/register', Register);
userRouter.post('/login', Login);
userRouter.get('/aboutuser/:userId', getUserById);
userRouter.get('/searchingusers', searchUsers);
userRouter.put('/updatefollower/:userId', updateUserFollowers);








export default userRouter




