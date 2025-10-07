import { getReceiverSocketId } from "../app.js";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { io } from "../app.js";
import Application from "../models/applicationModel.js";
import BookMark from "../models/bookmarkModel.js";

export const sendMessage = catchAsync(async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });
  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }
  await Promise.all([conversation.save(), newMessage.save()]);
  await newMessage.populate("senderId", "name");

  const receiverSocketId = getReceiverSocketId(receiverId);
  io.to(receiverSocketId).emit("newMessage", newMessage);

  res.status(201).json({
    status: "success",
    data: {
      newMessage,
    },
  });
});

// export const getMessages = catchAsync(async (req, res, next) => {
//   const { id: useToChatId } = req.params;
//   const senderId = req.user._id;

//   const conversation = await Conversation.findOne({
//     participants: { $all: [senderId, useToChatId] },
//   }).populate("messages");

//   // if (!conversation) {
//   //   return next(new AppError("Conversation not found", 404));
//   // }

//   res.status(200).json({
//     status: "success",
//     data: {
//       messages: conversation.messages,
//     },
//   });
// });
export const getMessages = catchAsync(async (req, res, next) => {
  const { id: useToChatId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, useToChatId] },
  }).populate("messages");
  if (!conversation) {
    return next(new AppError("Conversation not found", 404));
  }
  await Message.updateMany(
    { receiverId: senderId, senderId: useToChatId, seen: false },
    { $set: { seen: true } }
  );
  res.status(200).json({
    status: "success",
    data: {
      messages: conversation.messages,
    },
  });
});

export const deleteConversation = catchAsync(async (req, res) => {
  const senderId = req.user._id;
  const { id: useToChatId } = req.params;
  await Conversation.findOneAndDelete({
    participants: { $all: [senderId, useToChatId] },
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const getUnseenMessageCount = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const count = await Message.countDocuments({
    receiverId: userId,
    seen: false,
  });

  const appliedJobCountResult = await Application.aggregate([
    { $match: { user: userId } },
    { $count: "count" },
  ]);

  const bookmarkCountResult = await BookMark.aggregate([
    { $match: { user: userId } },
    { $count: "count" },
  ]);

  const appliedJobCount = appliedJobCountResult[0]?.count || 0;
  const bookmarkCount = bookmarkCountResult[0]?.count || 0;
  const StatelistObj = {
    messageCount: count,
    appliedJobCount: appliedJobCount,
    bookmarkCount: bookmarkCount,
  };

  res.status(200).json({
    status: "success",
    data: StatelistObj,
  });
});
