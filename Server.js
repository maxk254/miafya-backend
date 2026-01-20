import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import adminRouter from './routes/adminRoute.js'
// app config
const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api end point
app.use('/api/admin',adminRouter);
// localhost: 5000/api/admin

app.use('/api/user',userRouter);
//localhost:500/api/register

app.use("/api/user", userRouter);
//localhost:5000/api/login

app.get('/',(req,res)=>{
  res.send("API WORKING")
})

app.listen(port,()=>console.log("server started on port", port))