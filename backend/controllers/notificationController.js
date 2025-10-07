import { catchAsync } from "../utils/catchAsync.js";
import Notification from "../models/NotificationsModel.js";

export const getAllNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.find({
    receiverUser: req.user._id,
  });

  res.status(200).json({
    status: "success",
    data: {
      notifications,
    },
  });
});

export const deleteNotificationById = catchAsync(async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});
