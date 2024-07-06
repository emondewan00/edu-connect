"use server";

import connectDB from "@/lib/connectDB";
import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";

export const getUserById = async (id) => {
  await connectDB();
  const user = await User.findById(id).lean();
  return replaceMongoIdInObject(user);
};
