import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ["applied", "rejected", "shortlisted"],
    default: "applied",
  },
  message: String,
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
  resume: {
    type: String,
    required: [true, "Please provide your resume"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

applicationSchema.pre(/^find/, function (next) {
  this.populate("user").populate("post");
  next();
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
