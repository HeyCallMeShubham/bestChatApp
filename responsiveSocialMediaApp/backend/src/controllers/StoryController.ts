
import { Request, Response, NextFunction } from "express";

import { tryCatch } from "../utils/tryCatch";
import storyModel from "../models/storyModel";
import ErrorHandler from "../utils/ErrorHandler";
import postModel from "../models/PostModel";
import UserModel from "../models/User";






export const addCreateStory = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    const currentDate = new Date();
    
    // Get tomorrow's date
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    
    // Set the time to the same time as the current time
    tomorrowDate.setHours(currentDate.getHours());
    tomorrowDate.setMinutes(currentDate.getMinutes());
    tomorrowDate.setSeconds(currentDate.getSeconds());
    
    console.log(tomorrowDate);

    const {

        storyContent,
        storyByUser,
 

    } = req.body

    const story = await storyModel.create({

        storyContent: storyContent,
        storyByUser: storyByUser,
        expirationDateTime: currentDate

    });


    if (story) {

        res.status(200).json(story);

        console.log('story add')

    } else {

        next(ErrorHandler(501, "couldnt add the story"))

    }


});




export const getStories = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.userId

    const followedUsers = await UserModel.find({ followers: { $elemMatch: { userId: userId } } })

    const userStoriesPromises = await Promise.all(followedUsers.map(async (user) => {

       const stories =  await storyModel.find({ storyByUser:user?._id }).populate("storyByUser");

        if (!stories) {

           return next(ErrorHandler(401, "user needs to follow accounts to see posts"));

       }else{

           return stories;

       }


    }))



    return res.status(200).json(userStoriesPromises)






});











export const deleteStory = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    {/*

    
    const currentDate = new Date();
    
    // Get tomorrow's date
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    
    // Set the time to the same time as the current time
    tomorrowDate.setHours(currentDate.getHours());
    tomorrowDate.setMinutes(currentDate.getMinutes());
    tomorrowDate.setSeconds(currentDate.getSeconds());
    
    console.log(tomorrowDate);
    
*/}

    const storyToDelete: any = await storyModel.findById({ _id: req.params.storyId })



    if (new Date > storyToDelete.expirationDateTime) {



        const deletedStory = await storyModel.findByIdAndDelete({ _id: storyToDelete._id });

        ///  console.log('delete')

    } else {

        console.log("story has time to expire")

    }



})



















