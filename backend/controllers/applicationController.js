import Application from "../models/applicationModel.js";
import Post from "../models/postModel.js";
import AppliedJobs from "../models/appliedjobsModel.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import Notification from "../models/NotificationsModel.js";
import multer from "multer";

const multiStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/resume");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const fileName = `resume-${req.user.id}-${Date.now()}.${ext}`;

    cb(null, fileName);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new AppError("not an pdf,Please upload only pdf", 400), false);
  }
};
const upload = multer({
  storage: multiStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const uploadResume = upload.single("resume");

export const createApplication = catchAsync(async (req, res, next) => {
  // if (!req.file) {
  //   return next(new AppError("Resume is required", 400));
  // }
  if (req.file) req.body.resume = req.file.filename;
  const appliedJob = await AppliedJobs.findOne({
    user: req.body.user,
    post: req.body.post,
  });
  if (appliedJob)
    return next(new AppError("Already applied to this job.", 400));

  const application = await Application.create(req.body);
  await AppliedJobs.create({
    user: req.body.user,
    post: req.body.post,
    application: application._id,
  });

  const fullApplication = await Application.findById(application._id);
  const { post, user } = fullApplication;

  const bodyObj = {
    senderUser: user,
    receiverUser: post.postingUserId,
    data: {
      userName: user.name,
      postTitle: post.title,
    },
  };
  await Notification.create(bodyObj);
  res.status(200).json({
    status: "success",
    data: {
      application,
    },
  });
});

export const getAllAplications = catchAsync(async (req, res) => {
  const applications = await Application.find();

  res.status(200).json({
    status: "success",
    data: {
      applications,
    },
  });
});

export const getApplicationById = catchAsync(async (req, res) => {
  const application = await Application.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      application,
    },
  });
});

export const deleteApplicationById = catchAsync(async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const updateApplicationById = catchAsync(async (req, res) => {
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (req.body.status) {
    const { post, user } = application;
    const bodyObj = {
      senderUser: req.user._id,
      receiverUser: user._id,
      data: {
        status: req.body.status,
        postTitle: post.title,
        companyName: post.companyName,
      },
    };
    await Notification.create(bodyObj);
  }

  res.status(200).json({
    status: "success",
    data: {
      application,
    },
  });
});

export const recentlyAppliedJobs = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const applications = await Application.find({ user: userId })
    .sort({
      createdAt: -1,
    })
    .limit(6);
  console.log(userId);
  res.status(200).json({
    status: "success",
    data: {
      applications,
    },
  });
});
export const getStatusOfApplicant = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const statusAggregation = await Application.aggregate([
    {
      $match: { user: userId },
    },
    {
      $group: {
        _id: "$status", // values like 'applied', 'rejected', 'shortlisted'
        count: { $sum: 1 },
      },
    },
  ]);
  const statusOutput = statusAggregation.map((item) => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count,
  }));
  res.status(200).json({
    status: "success",
    data: {
      statusOutput,
    },
  });
});

export const ApplicationStates = catchAsync(async (req, res) => {
  const userId = req.user._id;

  // 1. Get all job posts by the recruiter
  const recruiterPostedJobs = await Post.find({ postingUserId: userId });
  const postIds = recruiterPostedJobs.map((post) => post._id);

  // 2. Get total applications count per post
  const totalApplications = await Application.aggregate([
    { $match: { post: { $in: postIds } } },
    {
      $group: {
        _id: "$post",
        count: { $sum: 1 },
      },
    },
  ]);

  // 3. Get shortlisted count per post
  const shortlistedApplications = await Application.aggregate([
    { $match: { post: { $in: postIds }, status: "shortlisted" } },
    {
      $group: {
        _id: "$post",
        count: { $sum: 1 },
      },
    },
  ]);

  // 4. Map results by post ID
  const totalMap = Object.fromEntries(
    totalApplications.map((item) => [item._id.toString(), item.count])
  );
  const shortlistedMap = Object.fromEntries(
    shortlistedApplications.map((item) => [item._id.toString(), item.count])
  );

  // 5. Final result
  const result = recruiterPostedJobs.map((post) => {
    const postId = post._id.toString();
    return {
      name: post.title,
      applications: totalMap[postId] || 0,
      shortlisted: shortlistedMap[postId] || 0,
    };
  });

  res.status(200).json({
    status: "success",
    data: result,
  });
});

export const shortlistedJobs = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const posts = await Application.find({
    user: userId,
    status: "shortlisted",
  }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

export const currentUserApplication = catchAsync(async (req, res) => {
  const applications = await Application.find({ user: req.user._id });
  res.status(200).json({
    status: "success",
    data: {
      applications,
    },
  });
});

export const getAllApplicants = catchAsync(async (req, res) => {
  const posts = await Post.find({ postingUserId: req.user._id });

  const postIds = posts.map((post) => post._id);
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 6;
  const skip = (page - 1) * limit;

  const applications = await Application.find({ post: { $in: postIds } })
    .limit(limit)
    .skip(skip);
  const totalCount = await Application.countDocuments();
  res.status(200).json({
    results: applications.length,
    status: "success",
    totalCount,
    data: {
      applications,
    },
  });
});
