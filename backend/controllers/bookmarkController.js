import BookMark from "../models/bookmarkModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllBookMarks = catchAsync(async (req, res) => {
  const bookmarks = await BookMark.find();
  res.status(200).json({
    status: "success",
    data: {
      bookmarks,
    },
  });
});

export const createBookMark = catchAsync(async (req, res) => {
  const bookmark = await BookMark.create({
    user: req.user._id, // always from logged-in user
    post: req.body.post,
  });
  res.status(201).json({
    status: "success",
    data: {
      bookmark,
    },
  });
});

export const deleteBookMarkById = catchAsync(async (req, res) => {
  await BookMark.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const getCurrentUserBookMarks = catchAsync(async (req, res) => {
  const bookmarks = await BookMark.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    status: "success",
    data: {
      bookmarks,
    },
  });
});
