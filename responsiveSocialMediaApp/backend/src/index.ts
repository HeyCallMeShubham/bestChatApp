import express, { Request, Response, NextFunction, response } from "express";

import cookieParser from "cookie-parser"

import bodyParser from "body-parser";

import cors from "cors";

const app = express();

import mongoose, { Callback } from "mongoose";

import { Server, Socket } from "socket.io";

import multer from "multer";

import dotenv from "dotenv";

import jwt from "jsonwebtoken";

import UserModel from "./models/User";

import { tryCatch } from "./utils/tryCatch";

import ErrorHandler from "./utils/ErrorHandler"

import userRouter from "./routes/UserRoutes";

import { JsonWebTokenError } from "jsonwebtoken";

import verifyToken from "./utils/userVerify";

import postRouter from "./routes/PostRoute";

import { isObjectLiteralElementLike } from "typescript";

import storyRouter from "./routes/storyRoutes";

import commentRouter from "./routes/CommentRoutes";

import MessagesModel from "./models/realTimeChatModels/messagesModel";

import MessageRouter from "./routes/MessageRouter";

import ChatRoomRouter from "./routes/ChatRoomRoutes";

import path from "path";

mongoose.connect("mongodb+srv://shubham:mylife@cluster0.natwega.mongodb.net/")



dotenv.config();



app.use(cors({

    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}));






app.use(bodyParser.json({ limit: "50mb" }));

app.use(cookieParser());

app.use("/api/v1/hellosocial/user", userRouter);

app.use("/api/v1/hellosocial/posts", postRouter);

app.use("/api/v1/hellosocial/story", storyRouter);

app.use("/api/v1/hellosocial/comments", commentRouter);

app.use("/api/v1/chatroom", ChatRoomRouter);

app.use("/api/v1/messages", MessageRouter);


app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("*", (req:Request, res:Response) =>{

  res.sendFile(path.join(__dirname, './client/build/index.html'));    

});







const expresServer = app.listen(Number(2024), () => {
    console.log(`Port is listening on ${2024}`);
});





const io = new Server(expresServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});



interface User {
    userId: string;
    socketId: string;
    email?: string,

}



const activeUsers: User[] = [];


const emailToSocket = new Map();


const socketToEmail = new Map();



const activeRoom = new Map()


io.on("connection", (socket: any) => {

    /// this join when user is active


    socket.on("join", (data: any) => {

        console.log(data, 'email')

        emailToSocket.set(data.email, socket.id);
        socketToEmail.set(data.socketId, data.email);

        socket.join(data.email);

        if (!activeUsers.some((user) => user.userId === data._id)) {

            activeUsers.push({

                userId: data._id,
                socketId: socket.id,
                email: data.email,


            });

        }

    });








    socket.on('active:room', (data: any) => {

        console.log(data, 'actveroom')

        socket.join(data.chatRoomId)

        activeRoom.set(data.chatRoomId, socket.id);

    });




    io.emit('active:users', activeUsers);


    interface sendMessageObj {

        chatRoomId: string,
        senderId: string,
        text: string

    }




    socket.on('send-message', async (data: sendMessageObj) => {

        const chatRoom = activeRoom.get(data.chatRoomId);

        const message = new MessagesModel(data);

        

        if (message) {

            message.save().then(() => {

                io.to(data.chatRoomId).emit('newmessage', message);

            }).catch((err) => {

                console.log(err)

            })

        }

    });







































    interface makingCall {

        offer: object,

        to: string,

        callingBy: string,

        chatRoomId: string

    }


    socket.on('making:call', (data: makingCall) => {

        console.log(data, 'dd')

      const {offer, to, callingBy, chatRoomId} = data

      io.to(to).emit("incoming:call", {offer, from:callingBy})


    });






      interface answerDataI {

        to:string,
        answer:object,
        answerBy:string


      }


   socket.on('answer:call', (data:answerDataI) =>{

    const {to, answer ,answerBy} = data
        
    io.to(to).emit("call:answer", {from:answerBy, answer})
 


   })
















})