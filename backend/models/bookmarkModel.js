import mongoose from "mongoose";

const bookmarksSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
bookmarksSchema.index({ user: 1, post: 1 }, { unique: true });

bookmarksSchema.pre(/^find/, function (next) {
  this.populate("user").populate("post");
  next();
});

const BookMark = new mongoose.model("BookMark", bookmarksSchema);

export default BookMark;
