import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("income")
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
      .query("income")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
    
    return entries.filter(e => e.date.startsWith(args.month));
  },
});

export const add = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    totalSales: v.number(),
    tips: v.number(),
    productSales: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("income", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("income"),
    totalSales: v.number(),
    tips: v.number(),
    productSales: v.number(),
    notes: v.optional(v.string()),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("income") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
