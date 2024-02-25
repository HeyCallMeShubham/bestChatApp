
import express from "express"
import { createChatRoom, getChatRoom } from "../controllers/chatControllers/chatController";


const ChatRoomRouter = express.Router()




ChatRoomRouter.post('/', createChatRoom);

ChatRoomRouter.post('/getuserschatroom/:firstId/:secondId', getChatRoom);














export default ChatRoomRouter



