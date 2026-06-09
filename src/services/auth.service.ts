import api from '@/lib/axios'
import type { LoginPayload, AuthResponse } from '@/types/auth.types'

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', payload)
    return response.data
  },
}