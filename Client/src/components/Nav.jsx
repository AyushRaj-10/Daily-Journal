import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full h-16 flex justify-between items-center px-8 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">📝 InkSpace</h1>
      <div className="flex gap-4">
        <button onClick={() => navigate('/login')} className="px-6 py-2 border-2 border-green-500 text-green-600 rounded-full hover:bg-green-50 transition">Login</button>
        <button onClick={() => navigate('/register')} className="px-6 py-2 border-2 border-green-500 bg-green-600 text-white rounded-full hover:bg-green-700 transition">Register</button>
      </div>
    </div>
  );
};

export default Nav;
