import { type ReactNode, createContext, useContext, useState, useEffect } from "react";

// Mocking Convex types
export type Id<T extends string> = string & { __tableName: T };

// Context for mock data
const MockDataContext = createContext<any>(null);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("booth-boss-data");
    if (saved) return JSON.parse(saved);
    return {
      income: [],
      expenses: [],
      user: { name: "Boss", email: "boss@example.com" }
    };
  });

  useEffect(() => {
    localStorage.setItem("booth-boss-data", JSON.stringify(data));
  }, [data]);

  const value = {
    data,
    setData,
    isAuthenticated: true, // Always authenticated for demo
    isLoading: false,
  };

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
}

export function MockAuthenticated({ children }: { children: ReactNode }) {
  const context = useContext(MockDataContext);
  if (context.isAuthenticated) return <>{children}</>;
  return null;
}

export function MockUnauthenticated({ children }: { children: ReactNode }) {
  const context = useContext(MockDataContext);
  if (!context.isAuthenticated) return <>{children}</>;
  return null;
}

export function MockAuthLoading({ children }: { children: ReactNode }) {
  const context = useContext(MockDataContext);
  if (context.isLoading) return <>{children}</>;
  return null;
}

export function useMockConvexAuth() {
  const context = useContext(MockDataContext);
  return {
    isLoading: context.isLoading,
    isAuthenticated: context.isAuthenticated,
  };
}

export function useMockQuery(apiPath: any, args?: any) {
  const context = useContext(MockDataContext);
  if (args === "skip") return undefined;

  const path = apiPath.toString();
  if (path.includes("income")) {
    return context.data.income;
  }
  if (path.includes("expenses")) {
    return context.data.expenses;
  }
  return [];
}

export function useMockMutation(apiPath: any) {
  const context = useContext(MockDataContext);
  const path = apiPath.toString();

  return async (args: any) => {
    const newData = { ...context.data };
    if (path.includes("income") && path.includes("add")) {
      const entry = { ...args, _id: Math.random().toString(36).substr(2, 9), createdAt: Date.now() };
      newData.income = [...newData.income, entry];
    } else if (path.includes("expenses") && path.includes("add")) {
      const entry = { ...args, _id: Math.random().toString(36).substr(2, 9), createdAt: Date.now() };
      newData.expenses = [...newData.expenses, entry];
    } else if (path.includes("remove")) {
       if (path.includes("income")) {
         newData.income = newData.income.filter((e: any) => e._id !== args.id);
       } else if (path.includes("expenses")) {
         newData.expenses = newData.expenses.filter((e: any) => e._id !== args.id);
       }
    }
    context.setData(newData);
    return true;
  };
}

export function useMockAuthActions() {
  return {
    signIn: async () => true,
    signOut: async () => {
      // For standalone demo, we could just reload or something
      window.location.href = "/login";
    },
  };
}
