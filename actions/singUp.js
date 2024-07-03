"use server";
import { redirect } from "next/navigation";
import { User } from "@/model/user-model";
import connectDB from "@/lib/connectDB";
const singUp = async (data) => {
  if (!data) return { message: "Data not found" };
  if (data.password !== data.confirmPassword)
    return { message: "Confirm Password Failed" };
  await connectDB();
  await User.create(data);
  redirect("/login");
};

export default singUp;
