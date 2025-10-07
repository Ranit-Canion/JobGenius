import express from "express";
import { protect } from "../controllers/authController.js";
import {
  deleteAppliedjobByID,
  getAllAppliedJobs,
} from "../controllers/appliedjobsController.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllAppliedJobs);
router.delete("/:id", deleteAppliedjobByID);

export default router;
