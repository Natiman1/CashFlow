import { relations } from "drizzle-orm"
import { user } from "./auth"
import { transactions } from "./transactions"
import { budgets } from "./budgets"
import { categories } from "./categories"

export const userRelations = relations(user, ({ many }) => ({
  transactions: many(transactions),
  budgets: many(budgets),
  categories: many(categories),
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

export const categoryRelations = relations(categories, ({ one }) => ({
  user: one(user, {
    fields: [categories.userId],
    references: [user.id],
  }),
}))

