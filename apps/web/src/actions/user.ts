"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: { name: string }) {
  const session = await getSession();
  if (session?.user.email === "demo@cashflow.app") {
    return { error: "Demo account is read-only" };
  }
  if (!session) return { error: "Unauthorized" };

  try {
    await db
      .update(user)
      .set({ name: data.name })
      .where(eq(user.id, session.user.id));

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { error: "Failed to update profile" };
  }
}
