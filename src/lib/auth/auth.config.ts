import type { NextAuthConfig } from "next-auth";
import type { User } from "next-auth";
import { Credentials } from "./providers/credentials";

export const authOptions: NextAuthConfig = {
  providers: [Credentials],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const u = user as User;
        token.id = u.id;
        token.username = u.username;
        token.name = u.name;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/entrar",
    verifyRequest: "/magiclink",
    // error: "/entrar?error=true",
    signOut: "/entrar?deslogado=true",
  },
};
