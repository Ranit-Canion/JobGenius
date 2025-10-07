import express from "express";
import {
  createUser,
  deleteMe,
  deleteUserById,
  generateAbout,
  generateDescription,
  getAllUsers,
  getJobRecruiterStats,
  getMessageFromChatBot,
  getMessageSidebarUsers,
  getUser,
  getUserById,
  removeEduAwardWorkObj,
  resizeCompanyLogo,
  resizeUserPhoto,
  updateCompanyDetails,
  updateUser,
  uploadCompanyLogo,
  uploadUserPhoto,
} from "../controllers/userController.js";
import {
  login,
  logout,
  protect,
  signUp,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

router.use(protect);
router.patch(
  "/updatecompanydetails",
  protect,
  uploadCompanyLogo,
  resizeCompanyLogo,
  updateCompanyDetails
);
router.post("/chatbot", getMessageFromChatBot);
router.get("/getjobrecruiterstats", getJobRecruiterStats);
router.get("/getmessageusers", getMessageSidebarUsers);
router.patch("/removeobj", removeEduAwardWorkObj);
router.get("/getuser", getUser);
router.delete("/deleteme", deleteMe);
router.patch("/updatePassword", updatePassword);
router.patch(
  "/updateuser",
  protect,
  uploadUserPhoto,
  resizeUserPhoto,
  updateUser
);
router.route("/").post(createUser).get(getAllUsers);
router.post("/generatedescription", generateDescription);
router.post("/generateabout", generateAbout);
router.route("/:id").delete(deleteUserById).get(getUserById);

export default router;
