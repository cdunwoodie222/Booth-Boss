import type { FunctionReference } from "convex/server";

export const api: {
  income: {
    getForUser: FunctionReference<"query", "public", { userId: string }, any[]>;
    getByMonth: FunctionReference<"query", "public", { userId: string; month: string }, any[]>;
    add: FunctionReference<"mutation", "public", any, string>;
    update: FunctionReference<"mutation", "public", any, void>;
    remove: FunctionReference<"mutation", "public", { id: string }, void>;
  };
  expenses: {
    getForUser: FunctionReference<"query", "public", { userId: string }, any[]>;
    add: FunctionReference<"mutation", "public", any, string>;
    remove: FunctionReference<"mutation", "public", { id: string }, void>;
  };
};
