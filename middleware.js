import NextAuth from "next-auth";
import authConfig from "./auth.config";
const { auth } = NextAuth(authConfig);
import { NextResponse } from "next/server";
import { PUBLIC_ROUTES, LOGIN, ROOT } from "./lib/routes";
export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  console.log(isAuthenticated, nextUrl?.pathname, "login in middleware");
  const isPublicRoute = PUBLIC_ROUTES.find(
    (r) => nextUrl.pathname.startsWith(r) || nextUrl.pathname === ROOT
  );


  if (!isAuthenticated && !isPublicRoute && nextUrl.pathname!== LOGIN) {
    const newUrl = new URL(LOGIN, req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
