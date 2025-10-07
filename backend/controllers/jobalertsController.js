import JobAlerts from "../models/jobalertsModel.js";
import JobSeeker from "../models/jobSeekerModel.js";
import Post from "../models/postModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllJobAlerts = catchAsync(async (req, res) => {
  const userProfile = await JobSeeker.findOne({ user: req.user._id });
  const { skills } = userProfile;
  const parsedOnce = JSON.parse(skills[0]);
  console.log(parsedOnce);
  const jobalerts = await Post.find({ skillsRequired: { $in: parsedOnce } });

  res.status(200).json({
    status: "success",
    data: {
      jobalerts,
    },
  });
});

export const deleteJobAlertById = catchAsync(async (req, res) => {
  await JobAlerts.findByIdAndDelete(req.param.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});
