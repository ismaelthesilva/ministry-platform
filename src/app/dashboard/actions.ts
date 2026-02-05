"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function selectPlan(
  userId: string,
  planSlug: string,
  language: string = "pt",
) {
  try {
    const plan = await prisma.plan.findFirst({
      where: {
        slug: planSlug,
        language: language,
      },
    });

    if (!plan) {
      return {
        success: false,
        error: language === "pt" ? "Plano não encontrado" : "Plan not found",
      };
    }

    // Create or update user
    await prisma.user.upsert({
      where: { id: userId },
      update: {
        selectedPlanId: plan.id,
        preferredLanguage: language,
      },
      create: {
        id: userId,
        selectedPlanId: plan.id,
        preferredLanguage: language,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/readings");
    return { success: true };
  } catch (error) {
    console.error("Error selecting plan:", error);
    return {
      success: false,
      error:
        language === "pt" ? "Erro ao selecionar plano" : "Error selecting plan",
    };
  }
}

export async function updateUserProfile(
  userId: string,
  data: {
    country?: string;
    phone?: string;
    religion?: string;
    age?: number;
    favBook?: string;
    favVerse?: string;
    preferredLanguage?: string;
  },
) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data,
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Erro ao atualizar perfil" };
  }
}

export async function markReadingComplete(userId: string, readingId: string) {
  try {
    await prisma.userProgress.upsert({
      where: {
        userId_readingId: {
          userId,
          readingId,
        },
      },
      update: {},
      create: {
        userId,
        readingId,
      },
    });

    revalidatePath("/dashboard/readings");
    return { success: true };
  } catch (error) {
    console.error("Error marking reading complete:", error);
    return { success: false, error: "Erro ao marcar leitura" };
  }
}

export async function clearUserPlan(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { selectedPlanId: null },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error clearing plan:", error);
    return { success: false, error: "Error clearing plan" };
  }
}

export async function getUserBibleTrackerData(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        progress: {
          include: {
            reading: true,
          },
        },
      },
    });

    if (!user || !user.selectedPlanId) {
      return {
        user: null,
        plan: null,
        todayReading: null,
        progress: [],
        allReadings: [],
        completedReadingIds: [],
        completionPercentage: 0,
      };
    }

    const plan = await prisma.plan.findUnique({
      where: { id: user.selectedPlanId },
    });

    if (!plan) {
      console.error("Plan not found for ID:", user.selectedPlanId);

      // Clear the invalid plan ID so user can select a new one
      await prisma.user.update({
        where: { id: userId },
        data: { selectedPlanId: null },
      });

      return {
        user: null,
        plan: null,
        todayReading: null,
        progress: [],
        allReadings: [],
        completedReadingIds: [],
        completionPercentage: 0,
      };
    }

    // Get current day of year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const allReadings = await prisma.dailyReading.findMany({
      where: {
        planId: plan.id,
      },
      orderBy: {
        dayNumber: "asc",
      },
    });

    const todayReading = allReadings.find((r) => r.dayNumber === dayOfYear);

    const completedReadingIds = user.progress.map((p) => p.readingId);
    const completionPercentage = Math.round(
      (completedReadingIds.length / allReadings.length) * 100,
    );

    return {
      user,
      plan,
      todayReading: todayReading || null,
      progress: user.progress,
      allReadings,
      completedReadingIds,
      completionPercentage,
    };
  } catch (error) {
    console.error("Error getting user tracker data:", error);
    return {
      user: null,
      plan: null,
      todayReading: null,
      progress: [],
      allReadings: [],
      completedReadingIds: [],
      completionPercentage: 0,
    };
  }
}

export async function getAllPlans(language?: string) {
  try {
    const plans = await prisma.plan.findMany({
      where: language ? { language } : undefined,
      orderBy: {
        title: "asc",
      },
    });

    return plans;
  } catch (error) {
    console.error("Error fetching plans:", error);
    return [];
  }
}
