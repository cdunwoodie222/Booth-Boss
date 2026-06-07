import { 
  useQuery as useConvexQuery, 
  useMutation as useConvexMutation,
  Authenticated as ConvexAuthenticated,
  Unauthenticated as ConvexUnauthenticated,
  AuthLoading as ConvexAuthLoading
} from "convex/react";
import { useConvexAuth as useActualConvexAuth, useAuthActions as useActualAuthActions } from "@convex-dev/auth/react";
import { 
  useMockQuery, 
  useMockMutation, 
  useMockConvexAuth, 
  useMockAuthActions,
  MockAuthenticated,
  MockUnauthenticated,
  MockAuthLoading
} from "../lib/convex-mock";

const isStandalone = !import.meta.env.VITE_CONVEX_URL;

export const useQuery = isStandalone ? useMockQuery : useConvexQuery;
export const useMutation = isStandalone ? useMockMutation : useConvexMutation;
export const useConvexAuth = isStandalone ? useMockConvexAuth : useActualConvexAuth;
export const useAuthActions = isStandalone ? useMockAuthActions : useActualAuthActions;

export const Authenticated = isStandalone ? MockAuthenticated : ConvexAuthenticated;
export const Unauthenticated = isStandalone ? MockUnauthenticated : ConvexUnauthenticated;
export const AuthLoading = isStandalone ? MockAuthLoading : ConvexAuthLoading;
