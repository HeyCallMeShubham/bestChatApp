"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, 'req.body');
    try {
        const saltRounds = 10; // You can adjust the number of salt rounds as needed
        const { userName, email, password, phone, profileImage } = req.body;
        //   if (
        //   [userName, email, password, phone, profileImage].some((field) => field?.trim() === "")
        // ) {
        ///         return next(ErrorHandler(400, "All Fields Are Required"));
        //        }
        const userExists = yield User_1.default.findOne({ email: email });
        if (userExists) {
            return next((0, ErrorHandler_1.default)(409, "user already exists"));
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        const userCreated = yield User_1.default.create({
            userName: userName,
            email: email,
            phone: phone,
            password: hashedPassword,
            profileImage: profileImage
        });
        if (userCreated) {
            return res.status(200).json({ message: "user created please login" });
        }
        {
            return next((0, ErrorHandler_1.default)(500, "internal server Error"));
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.Register = Register;
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            next((0, ErrorHandler_1.default)(401, "no user found"));
        }
        else {
            const jwtPayload = {
                userId: user._id,
                username: user.userName,
                email: email
            };
            const secretKey = "motabhaibhaibhai";
            ///                                              comparing password
            const validpassword = bcryptjs_1.default.compareSync(password, user.password);
            if (validpassword) {
                const accessToken = jsonwebtoken_1.default.sign(jwtPayload, secretKey, { expiresIn: '1h' });
                const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, secretKey, { expiresIn: "4d" });
                const httpOnlyOption = {
                    maxAge: 90000,
                    httpOnly: true,
                    secure: false,
                };
                res.cookie("helloSocialAppAccessToken", accessToken, httpOnlyOption);
                res.cookie("helloSocialAppRefreshToken", refreshToken, httpOnlyOption);
                res.status(200).json(user);
            }
            return next();
        } /// else end
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.Login = Login;
