// Edge-compatible config — no PrismaAdapter, no Node.js-only modules.
// Used by middleware to verify the JWT session without hitting the DB.
export const authConfig = {
  pages: {
    signIn: "/login",
    verifyRequest: "/login/verify",
  },
  callbacks: {
    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: { user?: unknown } | null;
      request: { nextUrl: URL };
    }) {
      const isLoggedIn = !!auth?.user;
      const protectedPrefixes = ["/dashboard", "/bible-tracker"];
      const isProtected = protectedPrefixes.some((p) =>
        nextUrl.pathname.startsWith(p)
      );
      if (isProtected && !isLoggedIn) {
        const loginUrl = new URL("/login", nextUrl.origin);
        loginUrl.searchParams.set("callbackUrl", nextUrl.href);
        return Response.redirect(loginUrl);
      }
      return true;
    },
  },
  providers: [], // providers added in auth.ts
};
