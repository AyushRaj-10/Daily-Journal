import express from 'express';
import { createPost, getAllPosts } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
import { Post } from '../models/post.model.js';
const router = express.Router();

router
  .route('/createPost')
  .get(getAllPosts)         // 🔥 This enables GET /api/createPost
  .post(verifyToken, createPost);  // POST /api/createPost

  router.get('/profile', verifyToken, async (req, res) => {
    try {
      const user = req.user;
      const posts = await Post.find({ author: user._id }).populate('author', 'name');
      res.json({ user, posts });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile data" });
    }
  });
  
  router.get('/post/:id', async (req, res) => {
    console.log("🔥 Reached /api/post/:id route", req.params.id); // debug log
  
    try {
      const post = await Post.findById(req.params.id).populate('author', 'name');
      if (!post) return res.status(404).json({ message: 'Post not found' });
  
      res.status(200).json({ post });
    } catch (err) {
      res.status(500).json({ message: "Error fetching post" });
    }
  });
  
  
  

export default router;
