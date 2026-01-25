import express from 'express'
import cors from 'cors'
import dotenv  from 'dotenv'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/v1/authRoutes.js';
import adminRouters from './routes/v1/adminRoutes.js'
import facilityRoutes from './routes/v1/facilityRoutes.js'
import professionalRoutes from './routes/v1/professionalRoutes.js'
import userRouters from './routes/v1/userRoutes.js'
// app config
dotenv.config();
connectDB();
connectCloudinary();

const app = express()
const port = process.env.PORT || 5000


// middlewares
app.use(express.json()) // Reads JSON body
app.use(cookieParser()); // reads cookies
app.use(cors({
  origin: '' , // frontend url
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Routes
app.use('/api/auth',authRoutes); //  auth api

app.use('/api/user', userRouters); // user api

app.use("/api/professional", professionalRoutes); // professional api

app.use('/api/facility', facilityRoutes); // facility api

app.use('/api/admin', adminRouters); // admin api

// Base Route
app.get('/',(req,res)=>{
  res.send("API WORKING")
})

// start server
app.listen(port,()=>console.log("server started on port", port))