import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema(
  {
    senderUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    receiverUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    data: {
      userName: String,
      postTitle: String,
      companyName: String,
      status: String,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationsSchema);

export default Notification;
