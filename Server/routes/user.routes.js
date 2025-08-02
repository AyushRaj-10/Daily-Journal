import express from 'express'
import {register,login,logout,verifyOtp} from '../controllers/user.controller.js'
import { getMe } from "../controllers/user.controller.js";
import {verifyToken} from '../utils/verifyToken.js'

const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.post('/otp',verifyOtp)
router.get('/profile',verifyToken)

router.get("/me", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;