"use server";

import connectDB from "@/lib/connectDB";
import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";
import bcrypt from "bcrypt";
export const getUserById = async (id) => {
  await connectDB();
  const user = await User.findById(id).select({ password: 0, __v: 0 }).lean();
  return replaceMongoIdInObject(user);
};

export const validatePassword = async (email, password) => {
  try {
    await connectDB();
    const user = await User.findOne({ email }).lean();
    if (!user) return false;
    const isValid = await bcrypt.compare(password, user.password);
    console.log(isValid, "password");
    return isValid;
  } catch (error) {
    console.error(error);
    return false;
  }
};
