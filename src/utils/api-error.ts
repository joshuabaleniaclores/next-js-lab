import axios from "axios";
import type { ApiError } from "@/types/api.types";

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "code" in error &&
    "statusCode" in error
  );
}

export function extractApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error) && error.response?.data) {
    return error.response.data as ApiError;
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: "CLIENT_ERROR",
      statusCode: 0,
    };
  }

  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN",
    statusCode: 0,
  };
}
