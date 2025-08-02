// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";
import { AppProvider, useAppContext } from "../context/AppState";

const BASE_URL = "http://localhost:3000";

const Home = () => {
  const { accessToken, user, logout, isLoading } = useAuth();
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { fetchPosts , createPost, posts  } = useAppContext();



  const handleCreatePost = async (e) => {
    e.preventDefault();
   await createPost({
    subject,
    image,
    content,
   })
  };

  useEffect(() => {
    if (isLoading) return; // wait for auth check
    if (!accessToken) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, [accessToken, isLoading]);
  

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Daily Journal</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/profile")}
              className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl hover:bg-white/20"
            >
              Profile
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Create Post Form */}
        {user && (
          <form
            onSubmit={handleCreatePost}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl mb-10 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-2 rounded bg-black/20 border mb-4"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full p-2 rounded bg-black/20 border mb-4"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <textarea
              placeholder="Write your content..."
              className="w-full p-2 rounded bg-black/20 border mb-4 h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-semibold"
            >
              Post
            </button>
          </form>
        )}

        {/* Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} onClick={() => navigate(`/post/${post._id}`)}>
             <Cards image={post.image} subject={post.subject} author={post.author?.name} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
