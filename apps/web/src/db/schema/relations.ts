// src/db/schema/relations.ts
import { relations } from "drizzle-orm"
import { user } from "./auth"
import { transactions } from "./transactions"
import { budgets } from "./budgets"

export const userRelations = relations(user, ({ many }) => ({
  transactions: many(transactions),
  budgets: many(budgets),
}))

export const transactionRelations = relations(transactions, ({ one }) => ({
  user: one(user, {
    fields: [transactions.userId],
    references: [user.id],
  }),
}))

export const budgetRelations = relations(budgets, ({ one }) => ({
  user: one(user, {
    fields: [budgets.userId],
    references: [user.id],
  }),
}))
