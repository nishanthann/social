import express from "express";
import { upload } from "../configs/multer.js";
import {
  addPost,
  getFeedPosts,
  likePosts,
} from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";

const postRouter = express.Router();

postRouter.post("/add", upload.array("images", 4), protect, addPost);
postRouter.post("/feed", protect, getFeedPosts);
postRouter.post("/like", protect, likePosts);

export default postRouter;
