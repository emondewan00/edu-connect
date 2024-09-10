import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import { getUserById } from "@/queries/users";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    await connectDB();
    const user = await getUserById(session.user.id);

    if (!user) {
      // Redirect to a "user not found" page if the user doesn't exist in the database
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.json(user);
  } catch (error) {
    // Redirect to an error page in case of server error
    return NextResponse.status(500).json({ message: error.message });
  }
};
