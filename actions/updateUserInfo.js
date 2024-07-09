"use server";

import connectDB from "@/lib/connectDB";
import { User } from "@/model/user-model";
import { validatePassword } from "@/queries/users";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

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

export const changePassword = async (email, data) => {
  try {
    const { oldPassword, newPassword } = data;
    await connectDB();
    const isValidPassword = await validatePassword(email, oldPassword);
    if (!isValidPassword) return { message: "Invalid password" };
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });
    return { message: "Password changed successfully", success: true };
  } catch (error) {
    console.error("Error updating user info", error);
    return { message: "Error changing password", success: false };
  }
};
