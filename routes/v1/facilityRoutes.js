import express from "express";
// Import the controller functions (make sure you have the controller file saved!)
// import {getProfile, updateProfile,} from "../../controllers/facilityController.js";
// // Import the auth middleware
// import { authenticateJWT } from "../../middlewares/isAuth.js";
const router = express.Router();

// Define the routes
// // GET /api/facility/me
// router.get("/me", authenticateJWT, getProfile);

// // PUT /api/facility/update
// router.put("/update", authenticateJWT, updateProfile);

// CRITICAL: This is the 'default export' your server was looking for
export default router;
