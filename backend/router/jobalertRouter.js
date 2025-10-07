import express from "express";
import { protect } from "../controllers/authController.js";
import {
  deleteJobAlertById,
  getAllJobAlerts,
} from "../controllers/jobalertsController.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllJobAlerts);
router.delete("/:id", deleteJobAlertById);

export default router;
