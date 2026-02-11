"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { categories } from "@/db/schema/categories";
import { getUser } from "@/lib/auth-utils";
import { categorySchema } from "@/lib/types/category-type";
import { defaultCategories } from "@/db/schema/categories";
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
}

export async function getUserCategories() {
  const user = await getUser();

  const userCategories = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, user.id));

  if (userCategories.length === 0) {
    const seededCategories = defaultCategories.map((c) => ({
      id: randomUUID(),
      userId: user.id,
      ...c,
    }));

    await db.insert(categories).values(seededCategories);
    return seededCategories;
  }

  return userCategories;
}

export async function deleteCategory(id: string) {
  try {
    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath("/dashboard/categories");
  } catch (error) {
    console.error("Delete category error:", error);
    throw new Error("Failed to delete category");
  }
}
