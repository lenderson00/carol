"use server";

import {
  auth,
  signIn as signInAction,
  signOut as signOutAction,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const baseSignIn = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    await signInAction("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Credenciais inválidas" };
  }
};

export const signIn = async (credentials: {
  email: string;
  password: string;
}) => {
  const result = await baseSignIn(credentials);
  if (result.error) {
    return result;
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (!user) {
    return { error: "Usuário não encontrado" };
  }

  redirect("/");
};

export const baseSignOut = async () => {
  try {
    await signOutAction({
      redirect: false,
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao deslogar" };
  }
};

export const signOut = async () => {
  const result = await baseSignOut();
  if (result.error) {
    return result;
  }
  redirect("/entrar");
};

export const resetPassword = async (password: string) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  if (!password || password.length < 8 || password.length > 30) {
    throw new Error("Senha inválida");
  }

  if (password === "Marinh@2025") {
    throw new Error("Senha não pode ser a senha padrão");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedPassword },
    select: { email: true },
  });

  await signInAction("credentials", {
    email: user.email,
    password: password,
    redirect: false,
  });

  redirect("/?bem-vindo=true");
};
