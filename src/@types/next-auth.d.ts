import { type DefaultSession, type DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      name: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: string;
    username: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    email: string;
    name: string;
  }
}
