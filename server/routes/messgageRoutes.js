import express from "express";
import {
  getMessages,
  messageSSE,
  sendMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../configs/multer.js";

const messageRouter = express.Router();

messageRouter.get("/:userId", messageSSE);
messageRouter.post("/send", upload.single("image"), protect, sendMessage);
messageRouter.post("/get", protect, getMessages);

export default messageRouter;
