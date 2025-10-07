import mongoose from "mongoose";
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title"],
    },
    location: {
      type: String,
      required: [true, "Please provide the location"],
    },
    jobType: {
      type: String,
      enum: ["Hybrid", "Full-Time", "Work-From-Home"],
    },
    description: {
      type: String,
      required: [true, "Please provide the description"],
    },
    skillsRequired: [String],
    experienceLevel: {
      type: String,
      enum: ["Entry-Level", "Intermediate-Level", "Experienced-Level"],
      required: [true, "Please provide the experienceLevel"],
    },
    salary: {
      type: String,
      required: [true, "Please provide the salary"],
    },
    expirationDate: {
      type: Date,
      required: [true, "Please provide the expiration date"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    companyLogo: {
      type: String,
      default: "defaultCompanyLogo.png",
    },
    companyName: {
      type: String,
      default: "xyz",
    },
    postingUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
postSchema.virtual("isExpired").get(function () {
  return new Date() > this.expirationDate;
});
const Post = mongoose.model("Post", postSchema);

export default Post;
