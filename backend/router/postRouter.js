import express from "express";
import {
  analyzeResume,
  createPost,
  deletePostById,
  getAllPosts,
  getPostById,
  getRecruiterPostedJobs,
  updateJobPost,
  upload,
} from "../controllers/postController.js";
import { protect, restricTo } from "../controllers/authController.js";

const router = express.Router();

router.get("/getrecruiterpostedjobs", protect, getRecruiterPostedJobs);
router.post("/analyze-resume", upload.single("resume"), analyzeResume);
router
  .route("/")
  .get(getAllPosts)
  .post(protect, restricTo("job-recruiter"), createPost);
router
  .route("/:id")
  .delete(protect, restricTo("job-recruiter"), deletePostById)
  .get(getPostById)
  .patch(updateJobPost);

export default router;
