import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './router/auth.route.js'
import userRoutes from './router/user.route.js'
import hackRoutes from './router/hack.route.js'
import eventRoutes from './router/event.route.js'
import newsletterRoutes from './router/newsletter.route.js'
import topperRoutes from './router/topper.route.js'
import feedbackRoutes from './router/feedback.route.js'
import cookieParser from "cookie-parser";
import path from 'path';
const app = express();
dotenv.config();
app.use(express.json());
const __dirname = path.resolve();
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.json('Hello the app is running')
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('The database is connected')
})

// All Api routes

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/hack',hackRoutes);
app.use('/api/event',eventRoutes);
app.use('/api/newsletter',newsletterRoutes);
app.use('/api/topper',topperRoutes);
app.use('/api/feedback',feedbackRoutes);
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'client','dist','index.html'))
  })
app.listen(process.env.PORT,()=>{
    console.log(`The app is running on https://localhost:${process.env.PORT}`);
})


