"use server";

import connectDB from "@/lib/connectDB";
import { User } from "@/model/user-model";
import { revalidatePath } from "next/cache";

export const updateUserInfo = async (email, data) => {
  try {
    await connectDB();
    await User.findOneAndUpdate({ email }, data);
    revalidatePath("/account");
    return { message: "User info updated successfully", success: true };
  } catch (error) {
    return { message: "Error updating user info", success: false };
  }
};

export const changePassword = async (email, oldPassword, newPassword) => {
  try {
  } catch (error) {}
};
