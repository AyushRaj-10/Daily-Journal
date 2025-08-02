// AppContext.js
import React, { createContext, useContext , useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3000";
  const { accessToken, user, logout, login } = useAuth();
  const [posts, setPosts] = useState([]);
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  // register
  const Register = async ({ name, email, password }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, {
        name,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      navigate('/login');
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
    }
  };

  //login
  const Login = async ({email,password}) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log("OTP sent:", response.data);
      navigate("/otp");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  }

  //otp 
  const Otp = async({otp,email}) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/otp`, {
        otp,
        email
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      console.log("Login Successful:", response.data);

      login(response.data.tokens.accessToken, response.data.user);
      navigate('/home');

    } catch (error) {
      console.error("OTP error:", error.response?.data || error.message);
    }
  }

  // create post
  const createPost = async({subject,image,content}) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/createPost`,{
        subject,
        image,
        content
      },{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true
      })
      console.log(response)
      fetchPosts()
    } catch (error) {
      console.error("Error in Creating Post:", error.response?.data || error.message);
    }
  }

  //fetch post
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/createPost`);
      setPosts(res.data.posts);
    } catch (err) {
      console.error("Post fetch error:", err);
    }
  };

  return (
    <AppContext.Provider value={{
      Register,
      Login,
      Otp,
      createPost,
      fetchPosts,
      posts,
      subject, setSubject,
      image, setImage,
      content, setContent,}}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
