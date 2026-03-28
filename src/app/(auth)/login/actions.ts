"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function loginWithCredentials(
  prevState: { error?: string } | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("CredentialsSignin") ||
        error.message.includes("credentials"))
    ) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }

  redirect("/dashboard");
}

export async function registerAccount(
  prevState: { error?: string } | undefined,
  formData: FormData
) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!name || !email || !password || !confirm) {
    return { error: "All fields are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirm) {
    return { error: "Passwords do not match." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await hash(password, 12);
  await prisma.user.create({
    data: { name, email, passwordHash },
  });

  await signIn("credentials", { email, password, redirect: false });
  redirect("/dashboard");
}

// Kept for future re-activation:
export async function sendMagicLink(
  prevState: { error?: string; sent?: boolean } | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  try {
    await signIn("resend", { email, redirect: false });
    return { sent: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Something went wrong. Please try again." };
    }
    throw error;
  }
}
