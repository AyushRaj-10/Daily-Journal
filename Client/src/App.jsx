// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Otp from './components/Otp';
import Home from './components/Home';
import Hero from './components/Hero';
import Profile from './components/Profile';
import SinglePost from './components/SinglePost';
import { useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppState';
import { AuthProvider } from './context/AuthContext';

const AppRoutes = () => {
  const { login } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      login(storedToken, JSON.parse(storedUser));
    }
  }, []);

  return (
     <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/post/:id" element={<SinglePost />} />
    </Routes>
  );
};

const App = () => (
  <Router>
      <AuthProvider>
    <AppProvider>
        <AppRoutes />
    </AppProvider>
      </AuthProvider>
  </Router>
);

export default App;
