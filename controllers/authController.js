// (Login, Register, Refresh Token)
import bcrypt from 'bcrypt';
import validator from "validator";
import User from '../models/User';
import userProfile from '../models/userProfile';
import ProfessionalProfile from '../models/professionalModel';
import FacilityProfile from '../models/FacilityProfile';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt"

// REGISTER CONTROLLER

export const register = async (req, res) => {
  try {
    const { email, password, role, name, ...profileData} = req.body;

    // checks if the user already exists in the database
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered"});
    }
      // checks empty forms
    if (!name || !email || password) {
      return res.status(401).json({sucess: false, message: "mising details"})
    };

    // validating email format
    if (!validator.isEmail(email)) {
      return res.status(401).json({sucess: false, message: 'enter a valid email'})
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({sucess: false, message: "Your password must contain atleast 8 characters"})
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hasshedPassword = await bcrypt.hash(password, salt);

    // create the base user (Common for all roles)
    // defaulting to user if no role is privided
    const newUser = await User.create({
      email,
      password: hasshedPassword,
      name,
      role: role || 'user',
      phone,
    });

    // create the specific profile based on role

    // professional
    if (newUser.role === 'professional') {
      // validate required professional fields
      if (!profileData.licenseNumber || !profileData.specialization) {
        // cleanup : Delete the user  data if profile creation fails (Basic transaction logic)
        await User.findByIdAndDelete(newUser._id);
        return res.status(400).json({error: 'Licence and specialization are required for professionals'});
      }
      await ProfessionalProfile.create({
        user: newUser._id,
        licenseNumber:profileData.licenseNumber,
        specialization:profileData.specialization,
        bio:profileData.bio,
        qualifications: profileData.qualifications
      });
    }
    // facility
    else if (newUser.role === 'facility') {
      if (!profileData.facilityName ||profileData.faclityRegistrationNumber ) {
        // delete facility data if profile creation fails
        await User.findByIdAndDelete(newUser._id);
        return res.status(400).json({error: 'Facility name is require'});
      }

      await FacilityProfile.create({
        user: newUser._id,
        facilityName:profileData.facilityName,
        faclityRegistrationNumber:profileData.faclityRegistrationNumber,
        facilityType: profileData.facilityType,
        location: profileData.location
      });
    }
    else {
      // defult: User (patient)
      // even if profileData is empty , we create the placeholder profile
      await userProfile.create({
        user:newUser._id,
        dateOfBirth:profileData.dateOfBirth,
        gender:profileData.gender,
        address: profileData.address
      });
    }
    // generate tokens  (log the user immediately)
    const payload= {id: newUser._id, role: newUser.role};
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // set secure cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 1000 // 7 days
    });
    
    // send Response
    res.status(200).json({
      message: "Registrstion successsful",
      accessToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Registaration Error", error);
    res.status(500).json({error: "Server error during registration"});
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) =>{
  try {
    const {email, password} = req.body;

    // find user by using email
    // we also select the password because it might be hidden by default in the model
    const user = await User.findOne({email}).select('+password');

    if (!user) {
      return res.status(401).json({error: 'invalid credentials'});
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({error: "Invaild credentials"});
    }

    // gatekeeper: check verification for proffessionals/facilities
    if ((user.role === 'professional' || user.role === 'facility') && !user.isVerified) {
      return res.status(403).json({
        error: "Account pending verification. Please wait for Approval."
      });
    }

    // Generate Token
    const payload = {id: user._id, role: user.role};
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // set Cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role:user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({error: "server error during login"})
  }
};

// REFRESH TOKEN
export const refresh = async (req, res) => {
  try {
    const cookieToken = req.cookies.refreshToken;

    if (!cookieToken) {
      return res.status(401).json({error: "No refresh token provided"})
    }

    // To verify token
    const decode = verifyRefreshToken(cookieToken);

    // check if user still exists
    const user = await User.findById(decode.id);
    if (!user) return res.status(401).json({error: "User not found"});

    //Issue New Acess Token
    const payload = {id: user._id, role: user.role};
    const newAccessToken = signAccessToken(payload);

    res.json({ accessToken: newAccessToken});
  } catch (error) {
    console.error("Refresh Error:", error);
    res.status(403).json({error: "Invalid or expired refresh token"})
  }
};

// LOGOUT
export const logout = async (res, res) => {
  try {
    // clear the cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.json({message: "Logged out successfully"});
  } catch (error) {
    res.status(500).json({error: "server error during logout"});
  }
};