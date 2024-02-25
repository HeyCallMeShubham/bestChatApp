
import express from "express"
import { addMessage, fetchConversations } from "../controllers/chatControllers/messagesController";
 

const MessageRouter = express.Router()




MessageRouter.post('/addmsg', addMessage);

MessageRouter.get('/fetchconversation/:chatroomid', fetchConversations);














export default MessageRouter



