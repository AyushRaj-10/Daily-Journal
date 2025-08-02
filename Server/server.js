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
app.use(cors({
  origin: 'https://daily-journal-blush.vercel.app',
  credentials: true
}));
app.options('*', cors({
  origin: 'https://daily-journal-blush.vercel.app',
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
