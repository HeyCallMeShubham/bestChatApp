import mongoose, { Document, Schema, Model } from "mongoose";

interface IChatRoom extends Document {
    members: string[];
}

const chatRoomSchema: Schema<IChatRoom> = new Schema<IChatRoom>({
    members: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const ChatRoomModel: Model<IChatRoom> = mongoose.model<IChatRoom>("HelloSocialchatRoom", chatRoomSchema);

export default ChatRoomModel;





