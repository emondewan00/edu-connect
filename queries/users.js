"use server";

import connectDB from "@/lib/connectDB";
import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";

export const getUserById = async (id) => {
  await connectDB();
  const user = await User.findById(id).select({ password: 0, __v: 0 }).lean();
  return replaceMongoIdInObject(user);
};
