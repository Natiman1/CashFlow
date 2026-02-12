import {
  pgTable,
  text,
  timestamp,
  numeric,
  integer,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { categories } from "./categories";

export const budgets = pgTable("budgets", {
  id: text("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),

  limit: numeric("limit", { precision: 12, scale: 2 }).notNull(),

  month: integer("month").notNull(),

  year: integer("year").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
