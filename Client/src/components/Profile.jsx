import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";

const BASE_URL = "http://localhost:3000";

const Profile = () => {
  const { accessToken, user, logout, isLoading } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!accessToken) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        setUserInfo(res.data.user);
        setUserPosts(res.data.posts);
      } catch (err) {
        console.error("Profile fetch failed", err);
        logout();
        navigate("/login");
      }
    };

    fetchProfile();
  }, [accessToken, isLoading]);

  if (isLoading || !userInfo) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {userInfo.name}</h1>
          <p className="text-gray-400">Email: {userInfo.email}</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
        {userPosts.length === 0 ? (
          <p className="text-gray-400">You haven't posted anything yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userPosts.map((post) => (
              <div key={post._id} onClick={() => navigate(`/post/${post._id}`)}>
                <Cards image={post.image} subject={post.subject} author={post.author?.name} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
