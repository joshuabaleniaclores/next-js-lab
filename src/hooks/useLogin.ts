"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { extractApiError } from "@/utils/api-error";
import { useAuthStore } from "@/store/auth.store";
import type { LoginPayload } from "@/types/api.types";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      try {
        return await authService.login(payload);
      } catch (error) {
        throw extractApiError(error);
      }
    },
    onSuccess: (data) => {
      setAuth(data);
      toast.success(`Welcome back, ${data.firstName}!`);
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
