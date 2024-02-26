import { Request, Response } from 'express';
import MessagesModel from '../../models/realTimeChatModels/messagesModel';


export const addMessage = async (req: Request, res: Response): Promise<void> => {


    try {
        const { chatRoomId, senderId, text } = req.body.msgdata;
        const message = new MessagesModel({
            chatRoomId,
            senderId,
            text
        });
        const result = await message.save();
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const fetchConversations = async (req: Request, res: Response): Promise<void> => {
    try {
        const conversation = await MessagesModel.find({ chatRoomId: req.params.chatroomid });
        res.status(200).json(conversation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
