import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnection } from './database/dbConnection.js';
import router from './routes/user.routes.js';
import cookieParser from 'cookie-parser' 
import postRouter from './routes/post.routes.js';

//dotenv config
dotenv.config();

// express setup
const app =  express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()) 

const allowedOrigins = [
  "https://daily-journal-blush.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

  

app.use('/api',router)
app.use('/api',postRouter)

// port
const port = process.env.PORT || 8000

// database connection
dbConnection();

//server live
app.listen(port,() => {
    console.log(`listening to ${port}`)
})
