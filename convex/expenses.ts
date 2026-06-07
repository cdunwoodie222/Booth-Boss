import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("expenses")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getByMonth = query({
  args: { 
    userId: v.id("users"),
    month: v.string(), // "YYYY-MM"
  },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("expenses")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
    
    return entries.filter(e => e.date.startsWith(args.month));
  },
});

export const add = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    amount: v.number(),
    category: v.string(),
    notes: v.optional(v.string()),
    isRecurring: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("expenses", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("expenses"),
    date: v.string(),
    amount: v.number(),
    category: v.string(),
    notes: v.optional(v.string()),
    isRecurring: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("expenses") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
