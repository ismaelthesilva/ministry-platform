import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// @ts-expect-error — next-auth v5 beta default import not callable under TS 5.9 + moduleResolution:bundler
export const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
  matcher: ["/dashboard/:path*", "/bible-tracker/:path*"],
};
