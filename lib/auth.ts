import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

import { mockUsers } from "@/lib/mock-data";

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
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // redirect to login
      } else if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
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
