import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const expenseCategories = [
  "Booth Rent",
  "Products",
  "Tools & Equipment",
  "Education",
  "Marketing",
  "Other",
] as const;

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    externalId: v.string(), // For auth
  }).index("by_externalId", ["externalId"]),

  income: defineTable({
    userId: v.id("users"),
    date: v.string(), // ISO date string
    totalSales: v.number(),
    tips: v.number(),
    productSales: v.number(),
    notes: v.optional(v.string()),
    createdAt: v.number(), // timestamp
  }).index("by_userId", ["userId"]),

  expenses: defineTable({
    userId: v.id("users"),
    date: v.string(),
    amount: v.number(),
    category: v.string(),
    notes: v.optional(v.string()),
    isRecurring: v.optional(v.boolean()),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
