"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const AUTH_STORAGE_KEY = "hackradar-authenticated";

type AuthContextValue = {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      signIn: () => {
        window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
        setIsAuthenticated(true);
      },
      signOut: () => {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        setIsAuthenticated(false);
      },
    }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
