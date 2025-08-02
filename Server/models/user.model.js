import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false 
  },
  refreshToken: {
    type: String,
    default: null,
  },
  accessToken: {
    type: String,
    default: null,
  },
  otp:{
    type:Number,
    require:true,
    select:false
  },
  otpExpires:{
    type:Date,
    select:false
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);

