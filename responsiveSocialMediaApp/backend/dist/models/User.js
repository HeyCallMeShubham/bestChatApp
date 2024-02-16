"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: [true, 'Password Is Required'] },
    profileImage: { type: String },
}, { timestamps: true });
const UserModel = mongoose_1.default.model("socialAppUser", userSchema);
exports.default = UserModel;
