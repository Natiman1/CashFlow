"use server";

import { db } from "@/lib/db";
import { notifications } from "@/db/schema/notifications"; 
import { getUser } from "@/lib/auth-utils";
import { eq, desc } from "drizzle-orm";

export async function getNotifications() {
  const user = await getUser();

  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, user.id))
    .orderBy(desc(notifications.createdAt));
}

export async function markNotificationAsRead(id: string) {

  await db
    .update(notifications)
    .set({ read: true })
    .where(eq(notifications.id, id));
}