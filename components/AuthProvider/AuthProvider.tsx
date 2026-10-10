"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkSession();
        const user = await getMe();
        setUser(user); 
      } catch (error) {
        clearAuth(); 
      }
    };

    void initAuth();
  }, [setUser, clearAuth]);

  return <>{children}</>;
}