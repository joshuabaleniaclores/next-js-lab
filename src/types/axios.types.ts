import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface ApiConfig {
  baseURL: string | undefined;
  timeout: number;
  headers: {
    "Content-Type": string;
    Accept: string;
  };
}

export type RequestInterceptor = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
export type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse;
