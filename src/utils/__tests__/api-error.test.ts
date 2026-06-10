import axios from "axios";
import { extractApiError } from "../api-error";

jest.mock("axios", () => ({
  isAxiosError: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("extractApiError", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns server error body when given an AxiosError with response data", () => {
    mockedAxios.isAxiosError.mockReturnValue(true);

    const axiosError = {
      response: {
        data: {
          message: "Unauthorized",
          code: "AUTH_ERROR",
          statusCode: 401,
        },
      },
    };

    const result = extractApiError(axiosError);

    expect(result).toEqual({
      message: "Unauthorized",
      code: "AUTH_ERROR",
      statusCode: 401,
    });
  });

  it("returns CLIENT_ERROR when given a standard Error", () => {
    mockedAxios.isAxiosError.mockReturnValue(false);

    const error = new Error("Network failure");

    const result = extractApiError(error);

    expect(result).toEqual({
      message: "Network failure",
      code: "CLIENT_ERROR",
      statusCode: 0,
    });
  });

  it("returns UNKNOWN error for unexpected error types", () => {
    mockedAxios.isAxiosError.mockReturnValue(false);

    const result = extractApiError("some unexpected string error");

    expect(result).toEqual({
      message: "An unexpected error occurred",
      code: "UNKNOWN",
      statusCode: 0,
    });
  });

  it("returns UNKNOWN error for null", () => {
    mockedAxios.isAxiosError.mockReturnValue(false);

    const result = extractApiError(null);

    expect(result).toEqual({
      message: "An unexpected error occurred",
      code: "UNKNOWN",
      statusCode: 0,
    });
  });

  it("returns UNKNOWN when AxiosError has no response data", () => {
    mockedAxios.isAxiosError.mockReturnValue(true);

    const axiosError = { response: null };

    const result = extractApiError(axiosError);

    expect(result).toEqual({
      message: "An unexpected error occurred",
      code: "UNKNOWN",
      statusCode: 0,
    });
  });
});
