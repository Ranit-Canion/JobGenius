import express from "express";
import {
  createBookMark,
  deleteBookMarkById,
  getAllBookMarks,
  getCurrentUserBookMarks,
} from "../controllers/bookmarkController.js";
import { protect } from "../controllers/authController.js";
const router = express.Router();
router.use(protect);
router.get("/currentuserbookmarks", getCurrentUserBookMarks);
router.route("/").get(getAllBookMarks).post(createBookMark);
router.delete("/:id", deleteBookMarkById);

export default router;
