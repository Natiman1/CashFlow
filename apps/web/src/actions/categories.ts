"use server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { categories } from "@/db/schema/categories";
import { getUser } from "@/lib/auth-utils";
import { categorySchema } from "@/lib/types/category-type";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function createCategory(data: unknown) {
  const user = await getUser();
  const parsed = categorySchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid category data");
  }

  await db.insert(categories).values({
    id: randomUUID(),
    userId: user.id,
    ...parsed.data,
  });

  revalidatePath("/dashboard/categories");
}

export async function getUserCategories() {
  const user = await getUser();

  return db.select().from(categories).where(eq(categories.userId, user.id));
}
