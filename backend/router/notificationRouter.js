import express from "express";
import {
  deleteNotificationById,
  getAllNotifications,
} from "../controllers/notificationController.js";
import { protect } from "../controllers/authController.js";
const router = express.Router();

router.get("/", protect, getAllNotifications);
router.delete("/:id", protect, deleteNotificationById);

export default router;
