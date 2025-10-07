import Application from "../models/applicationModel.js";
import AppliedJobs from "../models/appliedjobsModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllAppliedJobs = catchAsync(async (req, res) => {
  const appliedjobs = await AppliedJobs.find({ user: req.user._id })
    .populate("post")
    .populate("application");
  res.status(200).json({
    status: "success",
    data: {
      appliedjobs,
    },
  });
});

export const deleteAppliedjobByID = catchAsync(async (req, res) => {
  const appliedjob = await AppliedJobs.findById(req.params.id);

  // if (!appliedjob) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "Applied job not found",
  //   });
  // }
  const { post: postId, user: userId } = appliedjob;
  await Application.deleteOne({ user: userId, post: postId });
  await AppliedJobs.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});
