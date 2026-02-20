"use server";

import { db } from "@/lib/db";
import { notifications } from "@/lib/db";
import { getUser, isDemoUser } from "@/lib/auth-utils";
import { eq, desc, and } from "drizzle-orm";

export async function getNotifications() {
  const user = await getUser();

  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, user.id))
    .orderBy(desc(notifications.createdAt));
}

export async function markNotificationAsRead(id: string) {
  const user = await getUser();
  if (isDemoUser(user)) {
    throw new Error("Demo account is read-only");
  }
  await db
    .update(notifications)
    .set({ read: true })
    .where(eq(notifications.id, id));
}

export async function markAllNotificationsAsRead() {
  const user = await getUser();
  if (isDemoUser(user)) {
    throw new Error("Demo account is read-only");
  }
  await db
    .update(notifications)
    .set({ read: true })
    .where(eq(notifications.userId, user.id));
}

export async function deleteNotification(id: string) {
  const user = await getUser();
  if (isDemoUser(user)) {
    throw new Error("Demo account is read-only");
  }

  await db
    .delete(notifications)
    .where(and(eq(notifications.id, id), eq(notifications.userId, user.id)));
}
