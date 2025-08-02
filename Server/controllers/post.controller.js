import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const createPost = async (req, res) => {
  try {
    const { subject, image, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ message: "Subject and content are required." });
    }

    const user = req.user; // from verifyToken middleware

    const newPost = new Post({
      subject,
      image,
      content,
      author: user._id,
    });

    await newPost.save();

    await User.findByIdAndUpdate(user._id, {
      $push: { posts: newPost._id },
    });

    // 🔥 This is the key line to populate `author.name`
    const populatedPost = await Post.findById(newPost._id).populate('author', 'name');

    res.status(201).json({
      message: "Post created successfully",
      post: populatedPost, // send the populated version
    });

  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Something went wrong while creating the post" });
  }
};




export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name');
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};