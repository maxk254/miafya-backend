// mongodb.js

import mongoose from "mongoose"; //  importing mongoose

// Connecting to the database (mongodb database)
const connectDB = async () => {
  try {
    // event listener
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully!");
    });  // connecting with the mongodb url
    await mongoose.connect(`${process.env.MONGODB_URI}/miafya-backend`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;