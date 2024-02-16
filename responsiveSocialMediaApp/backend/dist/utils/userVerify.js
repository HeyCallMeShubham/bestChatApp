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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorHandler_mjs_1 = __importDefault(require("./ErrorHandler.mjs"));
const tryCatch_mjs_1 = require("./tryCatch.mjs");
const verifyToken = (0, tryCatch_mjs_1.tryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.zomato_cookie;
    if (!token) {
        return next((0, ErrorHandler_mjs_1.default)(401, "unauthorised user please.... login first...."));
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err)
            return next((0, ErrorHandler_mjs_1.default)(401, 'token not valid'));
        req.user = user;
        console.log(req.user);
        next();
    });
}));
exports.default = verifyToken;
