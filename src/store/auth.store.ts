import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthResponse } from "@/types/auth.types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (data: AuthResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (data) => {
        if (typeof window !== "undefined") {
          document.cookie = `access_token=${data.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }
        set({
          user: {
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            image: data.image,
          },
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      },
      clearAuth: () => {
        if (typeof window !== "undefined") {
          document.cookie = "access_token=; path=/; max-age=0";
        }
        set({ user: null, accessToken: null, refreshToken: null });
      },
    }),
    { name: "auth-storage" }
  )
);
