"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function sendMagicLink(
  prevState: { error?: string; sent?: boolean } | undefined,
  formData: FormData,
) {
  const email = formData.get("email") as string;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    await signIn("resend", { email, redirect: false });
    return { sent: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Something went wrong. Please try again." };
    }
    throw error;
  }
}
