"use server";
import { redirect } from "next/navigation";
import { User } from "@/model/user-model";
import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";
const singUp = async (data) => {
  if (!data) return { message: "Data not found" };
  if (data.password !== data.confirmPassword)
    return { message: "Confirm Password Failed" };
  const hashPassword = await bcrypt.hash(data.password, 10);
  await connectDB();
  await User.create({ ...data, password: hashPassword });
  redirect("/login");
};

export default singUp;
