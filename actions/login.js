"use server";

import { revalidatePath } from "next/cache";

const { signIn } = require("@/auth");

const credentialLogin = async (data) => {
  try {
    await signIn("credentials", {
      ...data,
      redirect: false,
    });
    revalidatePath("/");
    return { message: "Login successful", ok: true };
  } catch (error) {
    return { error: error.message || "Please try again ", ok: false };
  }
};

export default credentialLogin;
