
import { Express, NextFunction, Request, Response } from "express"

import jwt from "jsonwebtoken"

import bcrypt from "bcryptjs"


import userModel from "../models/User"
import ErrorHandler from "../utils/ErrorHandler"
import { tryCatch } from "../utils/tryCatch"
import { isNamedExportBindings } from "typescript"



export const Register = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body, 'req.body')

    try {


        const saltRounds = 10; // You can adjust the number of salt rounds as needed

        const { userName, email, password, phone, profileImage } = req.body


        //   if (
        //   [userName, email, password, phone, profileImage].some((field) => field?.trim() === "")
        // ) {

        ///         return next(ErrorHandler(400, "All Fields Are Required"));

        //        }


        const userExists = await userModel.findOne({ email: email });

        if (userExists) {

            return next(ErrorHandler(409, "user already exists"));

        }


        const hashedPassword = await bcrypt.hash(password, saltRounds);



        const userCreated = await userModel.create({


            userName: userName,
            email: email,
            phone: phone,
            password: hashedPassword,
            profileImage: profileImage

        });



        if (userCreated) {

            return res.status(200).json({ message: "user created please login" });

        } {


            return next(ErrorHandler(500, "internal server Error"));

        }



    } catch (err) {

        console.log(err)

    }

})






type payload = {

    userId: any,
    username: string,
    email: string

}







export const Login = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body)

    const { email, password } = req.body


    try {

        const user: any = await userModel.findOne({ email: email });


        if (!user) {


            next(ErrorHandler(401, "no user found with this email"));


        } else {


            const jwtPayload: payload = {

                userId: user._id,
                username: user.userName,
                email: email

            };


            const secretKey: string = "motabhaibhaibhai"


            ////  comparing password


            const validpassword = bcrypt.compareSync(password, user.password);



            if (validpassword) {



                const jwtPayload: payload = {

                    userId: user._id,
                    username: user.userName,
                    email: email

                };


                const accessToken = jwt.sign(jwtPayload, secretKey, { expiresIn: '15m' });
                const refreshToken = jwt.sign(jwtPayload, secretKey, { expiresIn: '2d' });



                type httpOptions = {

                    maxAge: number,
                    httpOnly: boolean,
                    secure: boolean,

                };



                const httpOnlyOption: httpOptions = {

                    maxAge: 3600000000,
                    httpOnly: false,
                    secure: false,

                };




                res.cookie("helloSocialAppAccessToken", accessToken, httpOnlyOption);
                res.cookie("helloSocialAppRefreshToken", refreshToken, httpOnlyOption);

                const { password, ...rest } = user._doc


                res.status(200).json({ userdata: rest });

            } else {

                next(ErrorHandler(401, 'wrong credentials'))

            }


            return next()


        }  /// else end



    } catch (err) {

        console.log(err)

        next(err)

    }

})







export const getUserById = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.params)

    const userData = await userModel.findOne({ _id: req.params.userId })

    if (!userData) {

        return next(ErrorHandler(401, "user not found"))

    }

    res.status(200).json({ userData: userData })

})







export const searchUsers = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.query)

    const usernames = req.query.username || ""

    const query = {

        userName: { $regex: usernames, $options: 'i' },
        /// username:{$regex:req., $options:'i'},

    }


    const relatedToNameUsers = await userModel.find(query)

    console.log(relatedToNameUsers, 'related')

    res.status(200).json(relatedToNameUsers)


})





// update user followers 



export const updateUserFollowers = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body.userId)

    const user = await userModel.findOne({ _id: req.params.userId })

    const userAlreadyFollows = user?.followers?.find((userId) => userId.userId === req.body.userId)

    if (userAlreadyFollows) {

        const updatedUser = await userModel.findOneAndUpdate({ _id: req.params.userId }, { $pull: { followers: { userId: req.body.userId } } }, { new: true });


        res.json(updatedUser);


    } else {

        const updatedUser = await userModel.findOneAndUpdate({ _id: req.params.userId }, { $push: { followers: { userId: req.body.userId } } }, { new: true });


        res.json(updatedUser)

        console.log("no user does not follows")

    }


})























