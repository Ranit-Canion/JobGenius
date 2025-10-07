import mongoose from "mongoose";

const jobRecruiterSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please provide company name"],
    default: "Not Provided",
  },
  companyLogo: {
    type: String,
    default: "default.jpg",
    required: [true, "Please provide company logo"],
  },
  companyAbout: {
    type: String,
    required: [true, "Please provide company about"],
    default: "Not Provided",
  },
  industry: {
    type: String,
    required: [true, "Please provide industry of company"],
    default: "Not Specified",
  },
  size: {
    type: String,
    required: [true, "Please provide size of company"],
    default: "Not Specified",
  },
  companyLocation: {
    type: String,
    required: [true, "Please provide location of company"],
    default: "Not Provided",
  },
  foundedIn: Number,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const JobRecruiter = new mongoose.model("JobRecruiter", jobRecruiterSchema);
export default JobRecruiter;
