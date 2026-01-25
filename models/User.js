import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['patient', 'professional', 'facility', 'admon'],
    default: 'user'
  },

  // simple data that everyone needs can be here
  name: {type:String, required: true},
  phone: {type: String, required: true},
  isVerified :{type:Boolean, default: false}, // this is usefull for health profesiionalas and fscilities
}, {timestamps: true});

// hide sensitive fields when converting to JSON
UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
})


export default mongoose.model("User", UserSchema);
