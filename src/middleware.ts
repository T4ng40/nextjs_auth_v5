import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const isLogged = !!request.auth;

  const { pathname } = request.nextUrl;

  const isPrivatePath = pathname.startsWith("/dash");

  if (isLogged && !isPrivatePath) {
    return NextResponse.redirect(new URL("/dash", request.nextUrl));
  }

  if (!isLogged && isPrivatePath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
});

export const config = {
  matcher: ["/login", "/register", "/dash", "/dash/:path"],
};
