import express from "express";

import { addCreateStory, deleteStory, getStories } from "../controllers/StoryController";



const storyRouter = express.Router();


 storyRouter.post("/create/add/story", addCreateStory);
 storyRouter.get("/get/stories/:userId", getStories);
 storyRouter.delete("/delete/:storyId", deleteStory);

 

export default storyRouter








