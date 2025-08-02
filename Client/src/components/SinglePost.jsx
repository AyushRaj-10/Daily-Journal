// src/pages/SinglePost.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = 'https://daily-journal-rsjh.onrender.com' || "http://localhost:3000";

const SinglePost = () => {
  const { id } = useParams(); // get post ID from URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/post/${id}`);
        setPost(res.data.post);
      } catch (err) {
        console.error("Failed to load post:", err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div className="text-white p-6">Loading post...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-[100vw] mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.subject}</h1>
      <p className="text-gray-400 mb-2">By: {post.author?.name}</p>
      {post.image && <img src={post.image} alt="Blog cover" className="rounded-lg m-auto mt-4 border-2 border-white" />}
      <p className="text-lg mt-4">{post.content}</p>
    </div>
  );
};

export default SinglePost;
