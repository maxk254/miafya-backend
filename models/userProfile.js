
import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // personal Details
  dateOfBirth: {type: Data},
  gender: {type: String, enum: ['Male', 'Famale', 'Other']},
  address: {type: String},

  // Helath Metrics
  height: {type: Number}, // in cm
  weight: { type: Number}, // in kg
  bloodType: {type: String},

  // Simple medical info
  chronicCondirtions: [String],
  allergies: [String],

  // Emergency Contacts
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  }
}, {timestamps: true});

export default mongoose.model("UserProfileSchema", UserProfileSchema);