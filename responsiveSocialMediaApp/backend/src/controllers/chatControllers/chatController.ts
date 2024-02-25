import { Request, Response } from 'express';
import ChatRoomModel from '../../models/realTimeChatModels/chatRoomModel';


export const createChatRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const newChat= new ChatRoomModel({
            members: [req.body.senderId, req.body.receiverId]
        });

        const result= await newChat.save();

        console.log("chatroomcreated")

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getChatRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const chatRoom = await ChatRoomModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        });

        if (chatRoom) {
            res.status(200).json(chatRoom);
        } else {
            const chatRoomCreated = await ChatRoomModel.create({
                members: [req.params.firstId, req.params.secondId]
            });
            res.status(200).json(chatRoomCreated);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

