"use server";
import { revalidatePath } from "next/cache";

import { db, categories, defaultCategories } from "@/lib/db";
import { getUser, isDemoUser } from "@/lib/auth-utils";
import { categorySchema } from "@repo/types";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export async function createCategory(data: unknown) {
  const user = await getUser();
  if (isDemoUser(user)) {
    throw new Error("Demo account is read-only");
  }

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

  const userCategories = await db.query.categories.findMany({
    where: (category, { eq }) => eq(category.userId, user.id),
  });

  // Only seed if zero categories exist for this user
  if (userCategories.length === 0) {
    const seededCategories = defaultCategories.map((c) => ({
      id: randomUUID(),
      userId: user.id,
      name: c.name,
      type: c.type,
      color: c.color,
      isDefault: true,
    }));

    try {
      await db.insert(categories).values(seededCategories);
      return seededCategories;
    } catch (error) {
      // If a race occurred, just fetch again
      return await db.query.categories.findMany({
        where: (category, { eq }) => eq(category.userId, user.id),
      });

      throw error;
    }
  }

  return userCategories;
}

export async function deleteCategory(id: string) {
  const user = await getUser();
  if (isDemoUser(user)) {
    throw new Error("Demo account is read-only");
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await db.delete(categories).where((eq as any)(categories.id, id));
    revalidatePath("/dashboard/categories");
  } catch (error) {
    console.error("Delete category error:", error);
    throw new Error("Failed to delete category");
  }
}
