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

    revalidatePath("/bible-tracker");
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

    revalidatePath("/bible-tracker");
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

    revalidatePath("/bible-tracker");
    return { success: true };
  } catch (error) {
    console.error("Error marking reading complete:", error);
    return { success: false, error: "Erro ao marcar leitura" };
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

    console.log("getUserBibleTrackerData - User found:", {
      userId,
      hasUser: !!user,
      selectedPlanId: user?.selectedPlanId,
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

    console.log("getUserBibleTrackerData - Plan found:", {
      planId: user.selectedPlanId,
      hasPlan: !!plan,
      planTitle: plan?.title,
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

    // Calculate day of year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    console.log("Looking for reading:", { planId: plan.id, dayOfYear });

    const todayReading = await prisma.dailyReading.findFirst({
      where: {
        planId: user.selectedPlanId,
        dayNumber: dayOfYear,
      },
    });

    const allReadings = await prisma.dailyReading.findMany({
      where: {
        planId: user.selectedPlanId,
      },
      orderBy: {
        dayNumber: "asc",
      },
    });

    console.log("Readings found:", {
      hasTodayReading: !!todayReading,
      totalReadings: allReadings.length,
      dayOfYear,
    });

    const completedReadingIds = new Set(user.progress.map((p) => p.readingId));

    return {
      user,
      plan,
      todayReading,
      progress: user.progress,
      allReadings,
      completedReadingIds: Array.from(completedReadingIds),
      completionPercentage:
        allReadings.length > 0
          ? Math.round((user.progress.length / allReadings.length) * 100)
          : 0,
    };
  } catch (error) {
    console.error("Error fetching Bible tracker data:", error);
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
      orderBy: { slug: "asc" },
    });
    return plans;
  } catch (error) {
    console.error("Error fetching plans:", error);
    return [];
  }
}
