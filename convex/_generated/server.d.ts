import type { QueryCtx, MutationCtx } from "convex/server";

export function query<Args extends Record<string, any>, Returns>(
  handler: (ctx: QueryCtx & { db: any }, args: Args) => Promise<Returns> | Returns
): {
  args: Args;
  handler: (ctx: QueryCtx & { db: any }, args: Args) => Promise<Returns> | Returns;
};

export function mutation<Args extends Record<string, any>, Returns>(
  handler: (ctx: MutationCtx & { db: any }, args: Args) => Promise<Returns> | Returns
): {
  args: Args;
  handler: (ctx: MutationCtx & { db: any }, args: Args) => Promise<Returns> | Returns;
};
