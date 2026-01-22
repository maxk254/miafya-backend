import express from "express";
import cookieParser from "cookie-parser";
import passport, { initialize } from "passport";
import dotenv  from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
initializePassport(passport);



app.get("/", async (req, res)=>{
  //
  const userId = (req, res).userId;
  if (!userId) return res.status(401).json({Error: "Not uthenticated"})
    res.json({userId});
});




export default app;