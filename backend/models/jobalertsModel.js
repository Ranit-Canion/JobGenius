import mongoose from "mongoose";

const jobalertSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
  },
});

const JobAlerts = mongoose.model("JobAlerts", jobalertSchema);

export default JobAlerts;
