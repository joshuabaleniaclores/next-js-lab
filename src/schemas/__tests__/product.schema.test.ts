import { addProductSchema, updateProductSchema } from "../product.schema";

describe("addProductSchema", () => {
  const validPayload = {
    title: "Test Product",
    price: 9.99,
    category: "beauty",
    brand: "Essence",
  };

  it("passes with valid payload", () => {
    const result = addProductSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  describe("title", () => {
    it("fails when title is empty", () => {
      const result = addProductSchema.safeParse({ ...validPayload, title: "" });
      expect(result.success).toBe(false);
    });

    it("fails when title exceeds 100 characters", () => {
      const result = addProductSchema.safeParse({ ...validPayload, title: "a".repeat(101) });
      expect(result.success).toBe(false);
    });

    it("trims whitespace from title", () => {
      const result = addProductSchema.safeParse({ ...validPayload, title: "  Test  " });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("Test");
      }
    });
  });

  describe("price", () => {
    it("fails when price is 0", () => {
      const result = addProductSchema.safeParse({ ...validPayload, price: 0 });
      expect(result.success).toBe(false);
    });

    it("fails when price is negative", () => {
      const result = addProductSchema.safeParse({ ...validPayload, price: -1 });
      expect(result.success).toBe(false);
    });

    it("passes with minimum valid price", () => {
      const result = addProductSchema.safeParse({ ...validPayload, price: 0.01 });
      expect(result.success).toBe(true);
    });
  });

  describe("category", () => {
    it("fails when category is empty", () => {
      const result = addProductSchema.safeParse({ ...validPayload, category: "" });
      expect(result.success).toBe(false);
    });
  });

  describe("brand", () => {
    it("fails when brand is empty", () => {
      const result = addProductSchema.safeParse({ ...validPayload, brand: "" });
      expect(result.success).toBe(false);
    });
  });
});

describe("updateProductSchema", () => {
  it("passes with all fields provided", () => {
    const result = updateProductSchema.safeParse({
      title: "Updated",
      price: 19.99,
      category: "beauty",
      brand: "Essence",
    });
    expect(result.success).toBe(true);
  });

  it("passes with only one field provided", () => {
    const result = updateProductSchema.safeParse({ title: "Updated Title" });
    expect(result.success).toBe(true);
  });

  it("fails with empty object — at least one field required", () => {
    const result = updateProductSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("fails when title is empty string", () => {
    const result = updateProductSchema.safeParse({ title: "" });
    expect(result.success).toBe(false);
  });

  it("fails when price is 0", () => {
    const result = updateProductSchema.safeParse({ price: 0 });
    expect(result.success).toBe(false);
  });
});
