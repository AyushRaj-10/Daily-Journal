import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, 
  },
  author: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // adds createdAt and updatedAt
});

export const Post = mongoose.model("Post", postSchema);
