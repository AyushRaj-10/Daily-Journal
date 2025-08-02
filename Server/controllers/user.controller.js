import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { sendOtpEmail } from "../utils/sendOTP.js";

export const register = async(req,res) => {
    try{
    let {name,email,password} = req.body

    let existingUser = await User.findOne({ email }) 
    if(existingUser){
        return res.status(400).json({ message: "User already exists" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password,10);

    // saving user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })


    const accessToken = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: "15m" }
      );
  
      const refreshToken = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: "7d" }
      );
  
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  

      // response
      res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      })
    } catch(error){
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
    }

}

export const login = async (req, res) => {
  const { email,password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email,password is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  await user.save();

  await sendOtpEmail(email, otp); // utility to send mail

  res.status(200).json({
    message: "OTP sent to email",
  });
};


export const logout = async(req,res) => {
    try {
        const userId = req.user?._id;
    
        if (!userId) {
          return res.status(401).json({ message: "Unauthorized" });
        }
    
        res.clearCookie("refreshToken", {
          httpOnly: true,
          sameSite: "Strict",
          secure: process.env.NODE_ENV === "production",
        });
    
        return res.status(200).json({
          message: "User logout successful",
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const user = await User.findOne({ email }).select("+otp +otpExpires");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isOtpValid = user.otp?.toString() === otp.toString() && user.otpExpires > new Date();

  if (!isOtpValid) {
    return res.status(401).json({ message: "Invalid or expired OTP" });
  }

  // Clear OTP
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  // Generate tokens
  const accessToken = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "OTP verified. Logged in successfully.",
    user: {
      _id: user._id,
      email: user.email,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  });
};

export const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    }
  });
};

