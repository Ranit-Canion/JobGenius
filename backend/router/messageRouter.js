import express from "express";
import { protect } from "../controllers/authController.js";
import {
  deleteConversation,
  getMessages,
  getUnseenMessageCount,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();
router.use(protect);
router.get("/getunseenmssgcounts", getUnseenMessageCount);
router.post("/send/:id", sendMessage);
router.get("/:id", getMessages);
router.delete("/:id", deleteConversation);

export default router;
