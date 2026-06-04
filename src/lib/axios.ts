import axios, { AxiosInstance, AxiosError } from "axios";
import type { ApiConfig, RequestInterceptor, ResponseInterceptor } from "@/types/axios.types";
import { useAuthStore } from "@/store/auth.store";

const apiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const api: AxiosInstance = axios.create(apiConfig);

const onRequest: RequestInterceptor = (config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onResponse: ResponseInterceptor = (response) => response;

const onResponseError = (error: AxiosError) => {
  const status = error.response?.status;

  if (status === 401) {
    useAuthStore.getState().clearAuth();
    window.location.href = "/login";
  }

  if (status !== undefined && status >= 500) {
    console.error("[API Error]", error);
  }

  return Promise.reject(error);
};

api.interceptors.request.use(onRequest);
api.interceptors.response.use(onResponse, onResponseError);

export default api;
