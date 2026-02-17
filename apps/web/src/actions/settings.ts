"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type UserSettings = {
  currency: string;
  language: string;
  notifications: {
    budgetAlerts: boolean;
    monthlyReports: boolean;
  };
};

export async function getSettings() {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const dbUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
    columns: {
      settings: true,
    },
  });

  return { settings: dbUser?.settings as UserSettings };
}

export async function updateSettings(newSettings: Partial<UserSettings>) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const dbUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
    columns: {
      settings: true,
    },
  });

  const currentSettings = (dbUser?.settings as UserSettings) || {
    currency: "USD",
    language: "en",
    notifications: { budgetAlerts: true, monthlyReports: false },
  };

  const updatedSettings = {
    ...currentSettings,
    ...newSettings,
    notifications: {
      ...currentSettings.notifications,
      ...(newSettings.notifications || {}),
    },
  };

  try {
    await db
      .update(user)
      .set({ settings: updatedSettings })
      .where(eq(user.id, session.user.id));

    revalidatePath("/dashboard/settings");
    return { success: true, settings: updatedSettings };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { error: "Failed to update settings" };
  }
}
