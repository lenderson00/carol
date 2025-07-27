import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { Provider } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";

// Types
interface Credentials {
  username: string;
  password: string;
}

interface UserData {
  id: string;
  username: string;
  name: string;
  password: string;
  createdAt: Date;
}

interface AuthResult {
  id: string;
  email: string;
  username: string;
  name: string;
  createdAt: Date;
}

// Database operations
const findUserByUsername = async (username: string): Promise<UserData | null> => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      name: true,
      password: true,
      createdAt: true,
    },
  });
  return user;
};

const validateCredentials = async (
  password: string,
  user: UserData
): Promise<boolean> => {
  const isPasswordValid = await compare(password, user.password);
  return isPasswordValid;
};

const buildAuthResult = (user: UserData): AuthResult => {
  return {
    id: user.id,
    email: user.username,
    username: user.username,
    name: user.name,
    createdAt: user.createdAt,
  };
};

// Main authorization function
const authorizeUser = async (credentials: Record<string, unknown>): Promise<AuthResult | null> => {
  const { username, password } = credentials as unknown as Credentials;

  const user = await findUserByUsername(username);

  if (!user) {
    return null;
  }

  const isValid = await validateCredentials(password, user);

  if (!isValid) {
    throw new Error("Invalid username or password");
  }

  return buildAuthResult(user);
};

// Export the provider
export const Credentials: Provider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "Enter your username" },
    password: { label: "Password", type: "password", placeholder: "Enter your password" },
  },
  authorize: authorizeUser,
});
