import User from "../models/User";
import userProfile from "../models/userProfile";


// get current user profile

export const getUserProfile = async (req, res) => {
  try {
    // fetch user profile and data
    const user = await User.findById(req.User.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        name:user.name,
        email:user.email,
        role:user.role
      },
      profile: profile || {} // return empty object if profile doesn't exist yet
    });
  } catch (error) {
    res.status(500).json({error: "Server Error"});
  }
};

// update user profile 