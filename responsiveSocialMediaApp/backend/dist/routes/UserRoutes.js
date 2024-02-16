"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserControllers_1 = require("../controllers/UserControllers");
const userRouter = express_1.default.Router();
userRouter.post('/register', UserControllers_1.Register);
userRouter.post('/login', UserControllers_1.Login);
exports.default = userRouter;
