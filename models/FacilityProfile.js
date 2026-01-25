// facility data

import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  facilityName: {type: String, required: true},
  facilityType: {type: String }, // eg clinic, hospital, dispensarry , pharmacy
  location: {
    address: String,
    city: String,
    coordinates: {lat: Number, lpng: Number} // this will help later when adding maps later
  },
  servicesOffered: [String],
  operationalHours: {type: String}
}, {timestamps: true});

export default mongoose.model("FacilityProfile", facilitySchema)