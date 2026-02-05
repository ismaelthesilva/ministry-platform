"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function clearUserPlan(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { selectedPlanId: null },
    });

    revalidatePath("/bible-tracker");
    return { success: true };
  } catch (error) {
    console.error("Error clearing plan:", error);
    return { success: false };
  }
}
