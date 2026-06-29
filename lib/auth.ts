import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

import { mockUsers } from "@/lib/mock-data";
import { paths } from "@/lib/paths";
import type { User } from "@/types";

declare module "next-auth" {
  interface Session {
    user: {
      role: User["role"];
    } & DefaultSession["user"];
  }
}

const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours
const JWT_MAX_AGE = 60 * 60; // 1 hour — refreshed on each request while session is active

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    maxAge: SESSION_MAX_AGE,
  },
  jwt: {
    maxAge: JWT_MAX_AGE,
  },
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
    error: paths.authError(),
  },
  logger: {
    error(error) {
      console.error("[Auth] error:", error);
    },
    warn(code) {
      console.warn("[Auth] warning:", code);
    },
  },
  callbacks: {
    //runs one every request to check if the user is authorized to access the page
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
    //runs when the user signs in to add the role to the token
    jwt({ token, user }) {
      if (user?.email) {
        const found = mockUsers.find((u) => u.email === user.email);
        token.role = found?.role ?? "viewer";
      }
      return token;
    },
    //runs when the session is checked to add the role to the session object
    session({ session, token }) {
      //adding the role to the session object so that it can be accessed client-side
      session.user.role = (token.role as User["role"]) ?? "viewer";
      return session;
    },
  },
});
