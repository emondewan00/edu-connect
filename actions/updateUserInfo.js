"use server";

import connectDB from "@/lib/connectDB";
import { User } from "@/model/user-model";
import { validatePassword } from "@/queries/users";
import { revalidatePath } from "next/cache";
import { signOut } from "@/auth";

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
    await connectDB();
    const isValidPassword = await validatePassword(email, oldPassword);
    if (!isValidPassword) return { message: "Invalid password" };
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });
    signOut();
    return { message: "Password changed successfully", success: true };
  } catch (error) {
    return { message: "Error changing password", success: false };
  }
};
