import api from "@/lib/axios";
import type { LoginPayload, AuthResponse } from "@/types/api.types";

export const authService = {
  async login(payload: LoginPayload) {
    const response = await api.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },
};
