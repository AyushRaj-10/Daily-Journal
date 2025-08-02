import React from 'react';
import Cards from './Cards';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-green-200 opacity-30 rounded-full blur-2xl z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 py-20 gap-8">
        {/* Left Content */}
        <div className="flex-1 space-y-6 max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-900 animate-fadeIn">
            Capture Your Thoughts. Daily.
          </h1>
          <h3 className="text-xl text-gray-700">
            A simple and private place to write your day, reflect, and grow.
          </h3>

          <div className="flex gap-4 pt-4">
            <button onClick={() => navigate('/register')} className="px-6 py-2 border-2 border-green-500 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
              Get Started
            </button>
            <button onClick={() => navigate('/login')} className="px-6 py-2 border-2 border-green-500 text-green-600 rounded-full hover:bg-green-50 transition">
              Login
            </button>
          </div>

          {/* Subtle Quote */}
          <p className="italic text-gray-500 pt-6">
            “Journaling is a voyage to the interior.” — Christina Baldwin
          </p>

          {/* Cards */}
          <div className="bg-gray-50 rounded-xl p-6 mt-6 shadow-md w-[45vw]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Cards
                subject="Food"
                author="Varun Khatri"
                image="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=900&auto=format&fit=crop&q=60"
              />
              <Cards
                subject="Football"
                author="Rahul Raj"
                image="https://plus.unsplash.com/premium_photo-1661868926397-0083f0503c07?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D"
              />
              
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1669904021308-567d085a0ee7?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000"
            alt="Journaling scene"
            className="w-[90%] max-w-md rounded-xl shadow-xl object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
