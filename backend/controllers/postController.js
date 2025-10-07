// postController.js

import { catchAsync } from "../utils/catchAsync.js";
import Post from "../models/postModel.js";
import AppError from "../utils/appError.js";
import Application from "../models/applicationModel.js";
import JobRecruiter from "../models/jobRecruiterModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  getDocument,
  GlobalWorkerOptions,
} from "pdfjs-dist/legacy/build/pdf.mjs";

dotenv.config();

// Utility: Enable __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure PDF.js worker from local path
GlobalWorkerOptions.workerSrc = path.join(
  __dirname,
  "../../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs"
);

// Multer config to read buffer
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// PDF Extractor
export async function extractTextFromBuffer(buffer) {
  const uint8Array = new Uint8Array(buffer);
  const loadingTask = getDocument({ data: uint8Array });
  const pdf = await loadingTask.promise;

  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str);
    pages.push(strings.join(" "));
  }

  return pages.join("\n\n");
}

export const analyzeResume = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError("No file uploaded", 400));

  const resumeText = await extractTextFromBuffer(req.file.buffer);

  const prompt = `
Extract structured information from the following resume text:

"""${resumeText}"""

Return it in this JSON format:

{
  "name": "",
  "email": "",
  "phone": "",
  "address": "",
  "skills": [],
  "summary": "",
  "projects": [
    {
      "title": "",
      "description": ""
    }
  ],
  "certificates": []
}`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  const responseText = await result.response.text();

  const jsonMatch = responseText.match(/{[\s\S]*}/);
  if (!jsonMatch) {
    return next(
      new AppError("Gemini response did not contain valid JSON", 500)
    );
  }

  const structuredData = JSON.parse(jsonMatch[0]);

  res.status(200).json({ structuredData });
});

export const createPost = catchAsync(async (req, res, next) => {
  req.body.postingUserId = req.user._id;
  const recruiter = await JobRecruiter.findOne({ user: req.user._id });
  req.body.companyLogo = recruiter.companyLogo;
  req.body.companyName = recruiter.companyName;
  const post = await Post.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

export const getAllPosts = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludeFields = ["sort", "fields", "limit", "page"];
  excludeFields.forEach((el) => {
    delete queryObj[el];
  });
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = Post.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  if (req.query.fields) {
    const fieldBy = req.query.fields.split(",").join(" ");
    query = query.select(fieldBy);
  } else {
    query = query.select("-__v");
  }
  const page = req.query.page * 1 || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  // query = await query.skip(skip).limit(limit);

  // if (req.query.page) {
  //   const countedPost = await Post.countDocuments();
  //   if (skip >= countedPost)
  //     return next(new AppError("This page does not exist", 404));
  // }

  // const posts = await query;

  const totalCount = await Post.countDocuments(JSON.parse(queryStr));

  // 6️⃣ Apply pagination
  const posts = await query.skip(skip).limit(limit);

  // 7️⃣ Check for overflow
  if (skip >= totalCount) {
    return next(new AppError("This page does not exist", 404));
  }

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts,
      totalCount,
    },
  });
});

export const getPostById = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const post = await Post.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

export const deletePostById = catchAsync(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id);
  await Application.deleteMany({ post: req.params.id });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const getRecruiterPostedJobs = catchAsync(async (req, res) => {
  const currentUser = req.user._id;

  const posts = await Post.find({ postingUserId: currentUser });
  const postsArr = [];
  for (const post of posts) {
    const totalApplicants = await Application.countDocuments({
      post: post._id,
    });
    const postObj = post.toObject();
    postObj.totalApplicants = totalApplicants;
    postsArr.push(postObj);
  }

  res.status(200).json({
    status: "success",
    data: {
      posts: postsArr,
    },
  });
});

export const updateJobPost = catchAsync(async (req, res) => {
  const jobpost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      jobpost,
    },
  });
});
