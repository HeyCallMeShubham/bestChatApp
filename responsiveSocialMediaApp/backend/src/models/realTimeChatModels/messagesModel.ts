import mongoose, { Document, Schema, Model } from "mongoose";

interface IMessage extends Document {
    chatRoomId: string;
    senderId: string;
    text: string;
}

const messagesSchema: Schema<IMessage> = new Schema<IMessage>({

    
    chatRoomId: {
        type: String,
        required: true
    },


    senderId: {
        type: String,
        required: true
    },
    

    text: {
        type: String,
        required: true
    }


}, { timestamps: true });

const MessagesModel: Model<IMessage> = mongoose.model<IMessage>("HelloSocialmessages", messagesSchema);

export default MessagesModel;
