// APIs for controlling the sysstem
// Approve / Reject Verification
// I also need to be able to view all users i can delete them from system for full control

import User from "../models/User";
import professionalProfile from "../models/professionalProfile";
import FacilityProfile from "../models/FacilityProfile";

// get all stats (dashboard Overview)
export const getStatus = async (req, res) =>{
  try {
    const totalUsers = await User.countDocuments();
    const totalProfs = await User.countDocuments({role: 'professional'});
    const pendingProfs = await User.countDocuments({role: 'professional', isVerified: false});

    res.json({ totalUsers, totalProfs, pendingProfs});
  } catch (error) {
    res.status(500).json({error: "Server Error"});
  }
};

// Get pending Aprovals (list unverified doctors/facilities)
export const getPendingUsers = async (req, res) => {
  try {
    // find users where verified is false and role is not user
    const pending = await User.find({
      isVerified: false,
      role: { $in: ['professional', 'facility']}
    }).select('-password') // prevent sending back password

    res.json(pending);
  } catch (error) {
    res.status(500).json({ error: "Server Error"})
  }
};

// Approva a User
export const approveUser = async (req, res) =>{
  try{
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      {isVerified: true},
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found"});

    res.json({ message: `User ${user.name} has been approved.`, user});
  } catch (error) {
    res.status(500).json({ error: 'server Error'})
  }
};

// Reject /Delet a user
export const rejectUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // delete the user
    await User.findByIdAndDelete(userId);

    // cleaning up their profile too
    await professionalProfile.findOneAndDelete({user: userId});
    await FacilityProfile.findOneAndDelete({user: userId});

    res.json({ message: "User rejected and removed."})
  } catch (error) {
    res.status(500).json({error: "Server Error"})
  }
};
