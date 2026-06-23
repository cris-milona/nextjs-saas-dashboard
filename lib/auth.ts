import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

import { mockUsers } from "@/lib/mock-data";
import { paths } from "@/lib/paths";

declare module "next-auth" {
  interface Session {
    user: {
      role: "admin" | "user" | "viewer";
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {},
      authorize() {
        const demo = mockUsers.find((u) => u.email === "demo@dashify.dev");
        if (!demo) return null;
        return { id: demo.id, name: demo.name, email: demo.email };
      },
    }),
  ],
  pages: {
    signIn: paths.login(),
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith(paths.home());

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // redirect to login
      } else if (isLoggedIn && nextUrl.pathname === paths.login()) {
        return Response.redirect(new URL(paths.home(), nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user?.email) {
        const found = mockUsers.find((u) => u.email === user.email);
        token.role = found?.role ?? "viewer";
      }
      return token;
    },
    session({ session, token }) {
      session.user.role =
        (token.role as "admin" | "user" | "viewer") ?? "viewer";
      return session;
    },
  },
});

// 1. types/index.ts:5 — User has role: "admin" | "user" | "viewer" as a field
// 2. lib/auth.ts:50-51 — the jwt callback looks up the signed-in user by email from mockUsers (standing in for the DB) and pulls found?.role onto the token
// 3. lib/auth.ts:56-57 — the session callback then copies that role onto session.user.role, making it available client-side
