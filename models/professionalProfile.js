import mongoose from 'mongoose';

const ProfessionalSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // links back to the login info
    required: true,
    unique:true
  }, 

  // seceficic details for the professionals
  licenseNumber: {type: String, required: true},
  specialization: {type: String , reruired: true}, // eg clinical offier, medical doctor, nutritionist
  qualifications: [String],
  bio: {type: String},
  yearsOfExperience: {type: Number},
  hospitalAffiliation: {type: String},

  // status specific to work
  isAvailable: {type: Boolean, default: true},
  isAvailableTime: {type: String},
}, {timestamps: true});

export default mongoose.model('ProfessionalProfile', ProfessionalSchema)