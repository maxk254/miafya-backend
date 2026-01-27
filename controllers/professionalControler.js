// API for healthprofesionals to be able to update their profiles and set their profile properly

import professionalProfile from '../models/professionalProfile.js';


// Get Professional profile
export const getProfile = async (req, res) => {
  try {
    const profile = await professionalProfile.findById({user: req.user.id})
      .populate("user", "name email phone is Verified");

      if (!profile) return res.status(400).json({error: "profile not found"});
      res.json(profile);
  } catch (error) {
    res.status(500).json({error: "Server Error"});
  }
};

// update Healthprofessional profile details
export const updateProfile = async (req, res) =>{
  try {
    const updates = req.body;

    // protected routes cannot change this information
    delete updates.user;
    delete updates.licenseNumber;
    delete updates.isVerified; // only admin can change this after verification
  
    const profile = await professionalProfile.findOneAndUpdate(
      {user: req.user.id},
      {$set: updates},
      {new: true, runValidators: true}
    );

    res.json({message: "Proile updated", profile});
  } catch (error) {
    res.status(500).json({error: "server Erro"})
  }
}
