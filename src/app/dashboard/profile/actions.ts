"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  country?: string;
  phone?: string;
  gender?: string;
  religion?: string;
  age?: number;
  favBook?: string;
  favVerse?: string;
}

export async function updateProfile(data: UpdateProfileData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    // Build the name field from firstName and lastName
    const name =
      data.firstName || data.lastName
        ? `${data.firstName || ""} ${data.lastName || ""}`.trim()
        : undefined;

    // Update user profile
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name || undefined, // Keep name in sync for backward compatibility
        country: data.country || null,
        phone: data.phone || null,
        gender: data.gender || null,
        religion: data.religion || null,
        age: data.age || null,
        favBook: data.favBook || null,
        favVerse: data.favVerse || null,
      },
    });

    revalidatePath("/dashboard/profile");

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "Failed to update profile",
    };
  }
}

export async function updateEmail(newEmail: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    const trimmed = newEmail.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return { success: false, message: "Please enter a valid email address." };
    }

    const existing = await prisma.user.findUnique({
      where: { email: trimmed },
    });

    if (existing && existing.id !== session.user.id) {
      return { success: false, message: "That email is already in use." };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { email: trimmed },
    });

    revalidatePath("/dashboard/profile");

    return { success: true, message: "Email updated successfully." };
  } catch (error) {
    console.error("Error updating email:", error);
    return { success: false, message: "Failed to update email." };
  }
}
