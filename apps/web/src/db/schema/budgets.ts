import { pgTable, text, timestamp, numeric, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const budgets = pgTable("budgets", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  category: text("category").notNull(),

  limit: numeric("limit", { precision: 12, scale: 2 }).notNull(),

  month: text("month").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
