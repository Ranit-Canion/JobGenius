import mongoose from "mongoose";

const jobSeekerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  age: Number,
  experience: { type: Number, default: 0 },
  currentPackage: Number,
  expectedPackage: Number,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default: "Male",
  },
  educationLevel: String,
  about: String,
  languages: [String],
  skills: [String],
  workExperience: [
    {
      title: String,
      subTitle: String,
      startYear: Number,
      endYear: Number,
      description: String,
    },
  ],
  education: [
    {
      title: String,
      subTitle: String,
      startYear: Number,
      endYear: Number,
      description: String,
    },
  ],
  awards: [
    {
      title: String,
      subTitle: String,
      startYear: Number,
      endYear: Number,
      description: String,
    },
  ],
});

const JobSeeker = new mongoose.model("JobSeeker", jobSeekerSchema);

export default JobSeeker;
