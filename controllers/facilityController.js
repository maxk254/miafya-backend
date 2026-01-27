// facilities to update their profiles
import FacilityProfile from "../models/FacilityProfile";

// To get facility profile from the data base
export const getProfile = async (req, res) =>{
  try {
  const profile = await FacilityProfile.findById({user: req.user.id})
    .populate('user', 'name email phone isVerified');
  
    if (!profile) return res.status(400).json({error: "facility not found"});
    res.json(profile);
  } catch (error) {
    res.status(500).json({error: "server Error"})
  }
};

// updates facilitry details
export const updateProfile = async (req, res) => {
  try{
    const updates = req.body;

    // potected fields
    delete updates.user;
    delete updates.isverified;
    delete updates.facilityRegistrationNumber;

    const profile = await FacilityProfile.findOneAndUpdate(
      {user: req.user.id},
      {$set: updates, location},
      {new: true, runValidators: true}
    );

    res.json({message: "facility updated", profile});
  } catch (error) {
    res.status(500).json({error: "Server Error"})
  }
};