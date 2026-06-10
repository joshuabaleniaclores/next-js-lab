import { loginSchema } from "../auth.schema";

describe("loginSchema", () => {
  describe("username", () => {
    it("passes with valid username", () => {
      const result = loginSchema.safeParse({ username: "emilys", password: "emilyspass" });
      expect(result.success).toBe(true);
    });

    it("fails when username is empty", () => {
      const result = loginSchema.safeParse({ username: "", password: "emilyspass" });
      expect(result.success).toBe(false);
    });

    it("fails when username is shorter than 3 characters", () => {
      const result = loginSchema.safeParse({ username: "ab", password: "emilyspass" });
      expect(result.success).toBe(false);
    });

    it("fails when username exceeds 20 characters", () => {
      const result = loginSchema.safeParse({ username: "a".repeat(21), password: "emilyspass" });
      expect(result.success).toBe(false);
    });

    it("trims whitespace from username", () => {
      const result = loginSchema.safeParse({ username: "  emilys  ", password: "emilyspass" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.username).toBe("emilys");
      }
    });
  });

  describe("password", () => {
    it("passes with valid password", () => {
      const result = loginSchema.safeParse({ username: "emilys", password: "emilyspass" });
      expect(result.success).toBe(true);
    });

    it("fails when password is shorter than 8 characters", () => {
      const result = loginSchema.safeParse({ username: "emilys", password: "short" });
      expect(result.success).toBe(false);
    });

    it("fails when password exceeds 64 characters", () => {
      const result = loginSchema.safeParse({ username: "emilys", password: "a".repeat(65) });
      expect(result.success).toBe(false);
    });

    it("fails when password is empty", () => {
      const result = loginSchema.safeParse({ username: "emilys", password: "" });
      expect(result.success).toBe(false);
    });
  });
});
