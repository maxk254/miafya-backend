import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./src/routes/v1/authRoutes";
import passport, { initializePassport } from "passport";
import dotenv  from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors);
app.use(cookieParser());
app.use(passport.initialize());
initializePassport(passport);


app.use("/auth", authRoutes);

app.get("/", async (req, res)=>{
  // for demo to be set up on middlewares
  const userId = (req, res).userId;
  if (!userId) return res.status(401).json({Error: "Not uthenticated"})
    res.json({userId});
});




export default app;