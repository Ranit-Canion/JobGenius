import JobRecruiter from "../models/jobRecruiterModel.js";
import JobSeeker from "../models/jobSeekerModel.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import sharp from "sharp";
import multer from "multer";
import dotenv from "dotenv";
import OpenAI from "openai";
import Post from "../models/postModel.js";
import Application from "../models/applicationModel.js";
import Message from "../models/messageModel.js";
dotenv.config();

const multiStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image,Please upload only image", 400), false);
  }
};
const upload = multer({
  storage: multiStorage,
  fileFilter: multerFilter,
});

export const resizeUserPhoto = catchAsync(async (req, file, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/user/${req.file.filename}`);
  next();
});

export const resizeCompanyLogo = catchAsync(async (req, file, next) => {
  if (!req.file) return next();
  req.file.filename = `companylogo-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/company/${req.file.filename}`);
  next();
});

export const uploadUserPhoto = upload.single("photo");
export const uploadCompanyLogo = upload.single("companyLogo");

export const createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

export const getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  let profile = null;

  if (user.role === "job-seeker") {
    profile = await JobSeeker.findOne({ user: user._id });
  } else if (user.role === "job-recruiter") {
    profile = await JobRecruiter.findOne({ user: user._id });
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
      profile,
    },
  });
});

export const deleteUserById = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);
  let profile = null;

  if (user.role === "job-seeker") {
    profile = await JobSeeker.findOne({ user: user._id });
  } else if (user.role === "job-recruiter") {
    profile = await JobRecruiter.findOne({ user: user._id });
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
      profile,
    },
  });
});

export const deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
const filterObj = (obj, ...allowedObj) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedObj.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
export const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates", 400));
  }
  const filteredObj = filterObj(req.body, "name");
  if (req.file) filteredObj.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    runValidators: true,
  });
  let updatedProfile = null;
  if (req.user.role === "job-seeker") {
    const filteredJobSeeker = filterObj(
      req.body,
      "experience",
      "skills",
      "education",
      "age",
      "gender",
      "languages",
      "currentPackage",
      "expectedPackage",
      "about",
      "awards",
      "workExperience"
    );
    updatedProfile = await JobSeeker.findOneAndUpdate(
      { user: req.user.id },
      filteredJobSeeker,
      { new: true, runValidators: true }
    );
  } else if (req.user.role === "job-recruiter") {
    const filteredJobRecruiter = filterObj(
      req.body,
      "industry",
      "companyAbout"
    );
    updatedProfile = await JobRecruiter.findOneAndUpdate(
      { user: req.user.id },
      filteredJobRecruiter,
      { runValidators: true }
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
      profile: updatedProfile,
    },
  });
});

// export const getMessageSidebarUsers = catchAsync(async (req, res) => {
//   const currentUser = req.user._id;
//   const users = await User.find({
//     _id: { $ne: currentUser },
//   });
//   res.status(200).json({
//     status: "success",
//     data: {
//       users,
//     },
//   });
export const getMessageSidebarUsers = catchAsync(async (req, res) => {
  const currentUser = req.user._id;

  const users = await User.find({ _id: { $ne: currentUser } }).select(
    "name photo"
  );

  const usersWithUnseen = await Promise.all(
    users.map(async (user) => {
      const unseenCount = await Message.countDocuments({
        receiverId: currentUser,
        senderId: user._id,
        seen: false,
      });
      return { ...user.toObject(), unseenCount };
    })
  );

  res.status(200).json({
    status: "success",
    data: usersWithUnseen,
  });
});

export const updateCompanyDetails = catchAsync(async (req, res) => {
  if (req.file) req.body.companyLogo = req.file.filename;
  const company = await JobRecruiter.findOneAndUpdate(
    { user: req.user.id },
    req.body
  );
  res.status(200).json({
    status: "success",
    data: {
      company,
    },
  });
});

export const removeEduAwardWorkObj = catchAsync(async (req, res) => {
  const { field, titleName } = req.body;

  if (!["awards", "education", "workExperience"].includes(field)) {
    return res.status(400).json({ status: "fail", message: "Invalid field" });
  }

  await JobSeeker.updateOne(
    { user: req.user._id },
    { $pull: { [field]: { title: titleName } } } // ✅ dynamic key
  );

  res.status(200).json({
    status: "success",
    message: `${field} with title "${titleName}" removed successfully`,
  });
});

import { GoogleGenerativeAI } from "@google/generative-ai";
import AppliedJobs from "../models/appliedjobsModel.js";
import Conversation from "../models/conversationModel.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateDescription = catchAsync(async (req, res, next) => {
  const { title, skills, location, experienceLevel } = req.body;

  if (!title || !skills || !location || !experienceLevel) {
    return next(
      new AppError(
        "Please provide all required fields: title, skills, location, and experience level.",
        400
      )
    );
  }

  const prompt = `Write a professional job description in valid HTML format. Your output must include the following three clearly structured sections:

<h2>Job Description</h2>
Write a short and engaging paragraph that describes the overall role, mission, and purpose of the job.

<h2>Key Responsibilities</h2>
Provide at least 4–6 bullet points inside a <ul><li>...</li></ul> list that describe the main duties and day-to-day tasks expected from the candidate. Be specific and use action verbs.

<h2>Skills & Requirements</h2>
Provide at least 4–6 bullet points inside a <ul><li>...</li></ul> list that outline the essential skills, qualifications, tools, and experience needed for the role.

Use natural and professional language. Do not skip or shorten any section. Respond ONLY with clean and well-formatted HTML.

Job Title: ${title}  
Location: ${location}  
Skills: ${skills.join(", ")}  
Experience Level: ${experienceLevel}

Respond ONLY with valid HTML.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const html = result.response.text().trim();

  if (!html) {
    return next(new AppError("Gemini AI did not return a valid response", 500));
  }

  res.status(200).json({ content: html });
});

export const generateAbout = catchAsync(async (req, res, next) => {
  const {
    educationLevel,
    skills,
    experience,
    workExperience,
    education,
    awards,
  } = req.body;

  if (!skills || skills.length === 0) {
    return next(
      new AppError("Please provide at least your skills to generate About", 400)
    );
  }

  const prompt = `Generate a professional and natural-sounding personal summary ("About Me") for a job seeker based on the following details:

  
Education Level: ${educationLevel || "Not specified"}  
Skills: ${skills.join(", ")}  
Years of Experience: ${experience || 0}  
Work Experience:
${
  workExperience
    ?.map(
      (exp, i) =>
        `- ${exp.title} at ${exp.subTitle} (${exp.startYear}–${exp.endYear})\n  - ${exp.description}`
    )
    .join("\n") || "Not provided"
}

Education:
${
  education
    ?.map(
      (edu) =>
        `- ${edu.title} at ${edu.subTitle} (${edu.startYear}–${edu.endYear})\n  - ${edu.description}`
    )
    .join("\n") || "Not provided"
}

Awards:
${
  awards
    ?.map(
      (award) =>
        `- ${award.title} (${award.startYear}–${award.endYear})\n  - ${award.description}`
    )
    .join("\n") || "None"
}

Write a 4–6 sentence paragraph suitable for a resume or professional profile.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const about = result.response.text().trim();

  if (!about) {
    return next(new AppError("Gemini did not return any summary", 500));
  }

  res.status(200).json({ about });
});

export const getJobRecruiterStats = catchAsync(async (req, res) => {
  const count = await Message.countDocuments({
    receiverId: req.user._id,
    seen: false,
  });

  const postedJobsCountResult = await Post.aggregate([
    { $match: { postingUserId: req.user._id } },
    { $count: "count" },
  ]);
  const posts = await Post.find({ postingUserId: req.user._id });
  const postIds = posts.map((post) => post._id);
  const applicationsCountResult = await Application.aggregate([
    { $match: { post: { $in: postIds } } },
    { $count: "count" },
  ]);

  const shortlistedCountResult = await Application.aggregate([
    { $match: { status: "shortlisted" } },
    { $count: "count" },
  ]);
  const rejectedCountResult = await Application.aggregate([
    { $match: { status: "rejected" } },
    { $count: "count" },
  ]);
  const postedJobsCount = postedJobsCountResult[0]?.count || 0;
  const applicationsCount = applicationsCountResult[0]?.count || 0;
  const shortlistedCount = shortlistedCountResult[0]?.count || 0;
  const rejectedCount = rejectedCountResult[0]?.count || 0;

  const JobRecruiterStatsObj = {
    messageCount: count,
    postedJobsCount: postedJobsCount,
    applicationsCount: applicationsCount,
    shortlistedCount: shortlistedCount,
    rejectedCount: rejectedCount,
  };
  res.status(200).json({
    status: "success",
    data: { JobRecruiterStatsObj },
  });
});

export const getMessageFromChatBot = catchAsync(async (req, res) => {
  const { message } = req.body;
  const user = await User.findById(req.user._id);
  let dbData = null;
  let prompt = "";

  if (user.role === "job-seeker") {
    // if (message.toLowerCase().includes("my applied jobs")) {
    //   dbData = await AppliedJobs.find({ user: user._id }).populate(
    //     "application"
    //   );
    // } else if (message.toLowerCase().includes("find jobs")) {
    //   // Example: filter by salary/location (could parse dynamically)
    //   dbData = await Post.find();
    // }
    const appliedJobsData = await AppliedJobs.find({ user: user._id }).populate(
      "application"
    );
    const postsData = await Post.find();
    const userProfile = await JobSeeker.findOne({ user: user._id });
    dbData = {
      appliedJobs: appliedJobsData,
      posts: postsData,
      myProfile: userProfile,
    };

    prompt = `You are an AI assistant for a job portal.
The current user is a ${user.role} named ${user.name}.
Only answer based on the user's current question.
If the question is casual (e.g., "hi", "hello"), give a short greeting only.
Do NOT include user profile details, skills, or extra information unless explicitly asked.
Keep answers in short, clear bullet points or 1-2 sentences.
Question: "${message}"`;
  }

  // 🟢 RECRUITER ROLE
  if (user.role === "job-recruiter") {
    const userProfile = await JobRecruiter.findOne({ user: user._id });
    const applicationData = await Application.find()
      .populate("user")
      .populate("post");
    dbData = {
      companyProfile: userProfile,
      application: applicationData,
    };

    prompt = `You are an AI assistant for a job portal.
The current user is a job-recruiter named ${user.name}.
Only answer the user's question directly.
If the question is casual (e.g., "hi", "hello"), respond with a short greeting only.
Do NOT mention backend, database, API, or technical processes in any answer.
If there is no relevant data, reply in a friendly and professional way (e.g., "No active jobs found at the moment.").
Keep answers short, clear, and in bullet points or 1–2 sentences.
Question: "${message}"`;
  }

  // 🟢 Add DB data to prompt if available
  if (dbData) {
    prompt += `Here is relevant database info:${JSON.stringify(dbData)}`;
    prompt += `Summarize this in a friendly, helpful way,answer point to point.`;
  }

  // 🟢 Call Gemini API
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  const reply = result.response.text();

  const cleanedReply = reply
    .replace(/\n\s*\*/g, "\n•") // Replace "* " bullets with "•"
    .replace(/\*\*/g, "") // Remove bold markdown
    .replace(/\n{2,}/g, "\n") // Remove extra blank lines
    .trim();

  res.status(200).json({
    status: "success",
    cleanedReply,
  });
});
