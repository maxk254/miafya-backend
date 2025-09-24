import validator from 'validator' // to validate the users emailm from the data base
import bcrypt from "bcrypt";
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'

//API to register user to join our platform

const registerUser = async (req, res) =>{

  try{

    const {name, email, password} = req.body

    if( !name || !password || !email) {
      return res.json({success:false, message:"missing details"})
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    //validating strong pasword
    if (password.length < 8) {
      return res.json({success:false,message:"You password must contain atleast 8 characters"})
    }

    const specialCharacterRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/;

    // checks if password contains any special character
    if (!specialCharacterRegex.test(password)) {
      return res.json({success: false,message: "you password must contain a special character",});
    }

    //hashing user password using bycrypt method
    const salt = await bcrypt.genSalt(10)
    const hasshedPassword = await bcrypt.hash(password,salt)


    const userData = {
      name,
      email,
      password:hasshedPassword
    }

    const newUser = new userModel(userData);
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    

    res.json({success:true,token})


  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }


} 

//API for user login who has creted an account
const loginUser = async (req,res) =>{

  try{

      const {email,password} = req.body
      const user = await userModel.findOne({email})

      if (!user) {
        return res.json({ success: false, message: "user does not exist" });
      }

      const isMatch = await bcrypt.compare(password,user.password)

      if (isMatch) {
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true,token})
      } else {
        res.json({success:false,message: "Invalid credentials"})
      }

  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

export { registerUser, loginUser };