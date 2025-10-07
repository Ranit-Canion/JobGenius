import mongoose from "mongoose";

const appliedjobsSchema = mongoose.Schema(
  {
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
    application: {
      type: mongoose.Schema.ObjectId,
      ref: "Application",
      required: true,
    },
  },
  { timestamps: true }
);

const AppliedJobs = new mongoose.model("AppliedJobs", appliedjobsSchema);

export default AppliedJobs;
