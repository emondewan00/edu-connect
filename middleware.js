import NextAuth from "next-auth";
import authConfig from "./auth.config";
const { auth } = NextAuth(authConfig);
import { NextResponse } from "next/server";
export default auth((req) => {
  //   if (!req.auth && req.nextUrl.pathname !== "/login") {
  //     const newUrl = new URL("/login", req.nextUrl.origin);
  //     return Response.redirect(newUrl);
  //   }
  return NextResponse.next();
});
