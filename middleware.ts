import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // matcher: ["/admin/:path*"], // Protecting the admin routes
  matcher: ["/((?!api|_next/static|_next/image|uploads|favicon.ico).*)"],
};
