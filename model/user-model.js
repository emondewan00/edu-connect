import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  designation: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "student",
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  socialMedia: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  profile_picture: {
    type: String,
    required: false,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
