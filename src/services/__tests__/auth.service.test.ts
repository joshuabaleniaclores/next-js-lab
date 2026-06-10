import { authService } from "../auth.service";
import api from "@/lib/axios";

jest.mock("@/lib/axios", () => ({
  default: {
    post: jest.fn(),
  },
}));

const mockedApi = api as jest.Mocked<typeof api>;

describe("authService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("calls POST /auth/login with the correct payload", async () => {
      const payload = { username: "emilys", password: "emilyspass" };
      const mockResponse = { data: { accessToken: "token", id: 1, firstName: "Emily" } };
      mockedApi.post.mockResolvedValue(mockResponse);

      await authService.login(payload);

      expect(mockedApi.post).toHaveBeenCalledWith("/auth/login", payload);
      expect(mockedApi.post).toHaveBeenCalledTimes(1);
    });

    it("returns response.data", async () => {
      const payload = { username: "emilys", password: "emilyspass" };
      const mockData = { accessToken: "token", id: 1, firstName: "Emily" };
      mockedApi.post.mockResolvedValue({ data: mockData });

      const result = await authService.login(payload);

      expect(result).toEqual(mockData);
    });

    it("throws when the request fails", async () => {
      const payload = { username: "wrong", password: "wrong" };
      mockedApi.post.mockRejectedValue(new Error("Request failed"));

      await expect(authService.login(payload)).rejects.toThrow("Request failed");
    });
  });
});
