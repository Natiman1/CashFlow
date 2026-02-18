import { db } from "@/lib/db";
import { notifications } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

export async function createNotificationOnce(
  userId: string,
  type: string,
  title: string,
  message: string,
) {
  const existing = await db
    .select()
    .from(notifications)
    .where(and(eq(notifications.userId, userId), eq(notifications.type, type)))
    .limit(1);

  if (existing.length > 0) return;

  await db.insert(notifications).values({
    id: crypto.randomUUID(),
    userId,
    type,
    title,
    message,
  });
}
