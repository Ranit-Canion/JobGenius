import express from "express";
import {
  createApplication,
  currentUserApplication,
  deleteApplicationById,
  getAllAplications,
  getApplicationById,
  recentlyAppliedJobs,
  shortlistedJobs,
  updateApplicationById,
  uploadResume,
  getStatusOfApplicant,
  ApplicationStates,
  getAllApplicants,
} from "../controllers/applicationController.js";
import { protect } from "../controllers/authController.js";
const router = express.Router();

router.use(protect);

router.get("/getallapplicants", getAllApplicants);
router.get("/recentlyappliedjobs", recentlyAppliedJobs);
router.get("/shortlistedjobs", shortlistedJobs);
router.get("/currentuserapplications", currentUserApplication);
router.get("/getApplicantStatus", getStatusOfApplicant);
router.get("/getapplicationstates", ApplicationStates);
router.route("/").get(getAllAplications).post(uploadResume, createApplication);
router
  .route("/:id")
  .get(getApplicationById)
  .delete(deleteApplicationById)
  .patch(updateApplicationById);

export default router;
