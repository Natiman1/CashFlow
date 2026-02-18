import { pgTable, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { categories } from "./categories";

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  description: text("description").notNull(),

  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),

  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),

  date: timestamp("date", { mode: "date" }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
