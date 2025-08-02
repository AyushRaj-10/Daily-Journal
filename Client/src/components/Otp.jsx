import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppState';

const Otp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {Otp} = useAppContext();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const formHandler = async (e) => {
    e.preventDefault();
    await Otp({otp,email})
   
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Verify Your Identity</h1>
        <p className="text-center text-gray-500 mb-6">Enter the OTP sent to your email and join the family 🎉</p>

        <form onSubmit={formHandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="4-digit code"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-green-600 hover:bg-green-700 rounded-xl transition font-semibold text-lg"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
