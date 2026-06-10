import { productService } from "../product.service";
import api from "@/lib/axios";

jest.mock("@/lib/axios", () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedApi = api as jest.Mocked<typeof api>;

const mockProduct = { id: 1, title: "Test Product", price: 9.99 };

describe("productService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("calls GET /products", async () => {
      mockedApi.get.mockResolvedValue({ data: { products: [], total: 0, skip: 0, limit: 12 } });

      await productService.getProducts();

      expect(mockedApi.get).toHaveBeenCalledWith("/products", { params: undefined });
    });

    it("passes pagination params", async () => {
      mockedApi.get.mockResolvedValue({ data: { products: [], total: 0, skip: 12, limit: 12 } });

      await productService.getProducts({ limit: 12, skip: 12 });

      expect(mockedApi.get).toHaveBeenCalledWith("/products", { params: { limit: 12, skip: 12 } });
    });

    it("returns response.data", async () => {
      const mockData = { products: [mockProduct], total: 1, skip: 0, limit: 12 };
      mockedApi.get.mockResolvedValue({ data: mockData });

      const result = await productService.getProducts();

      expect(result).toEqual(mockData);
    });
  });

  describe("getProductById", () => {
    it("calls GET /products/:id", async () => {
      mockedApi.get.mockResolvedValue({ data: mockProduct });

      await productService.getProductById(1);

      expect(mockedApi.get).toHaveBeenCalledWith("/products/1");
    });

    it("returns response.data", async () => {
      mockedApi.get.mockResolvedValue({ data: mockProduct });

      const result = await productService.getProductById(1);

      expect(result).toEqual(mockProduct);
    });
  });

  describe("addProduct", () => {
    it("calls POST /products/add with payload", async () => {
      const payload = { title: "New Product", price: 9.99 };
      mockedApi.post.mockResolvedValue({ data: { id: 195, ...payload } });

      await productService.addProduct(payload);

      expect(mockedApi.post).toHaveBeenCalledWith("/products/add", payload);
    });

    it("returns response.data", async () => {
      const payload = { title: "New Product" };
      const mockData = { id: 195, ...payload };
      mockedApi.post.mockResolvedValue({ data: mockData });

      const result = await productService.addProduct(payload);

      expect(result).toEqual(mockData);
    });
  });

  describe("updateProduct", () => {
    it("calls PATCH /products/:id with payload", async () => {
      const payload = { title: "Updated Title" };
      mockedApi.patch.mockResolvedValue({ data: { ...mockProduct, ...payload } });

      await productService.updateProduct(1, payload);

      expect(mockedApi.patch).toHaveBeenCalledWith("/products/1", payload);
    });
  });

  describe("deleteProduct", () => {
    it("calls DELETE /products/:id", async () => {
      mockedApi.delete.mockResolvedValue({ data: { ...mockProduct, isDeleted: true, deletedOn: "2024-01-01" } });

      await productService.deleteProduct(1);

      expect(mockedApi.delete).toHaveBeenCalledWith("/products/1");
    });

    it("returns response.data with isDeleted", async () => {
      const mockDeleted = { ...mockProduct, isDeleted: true, deletedOn: "2024-01-01" };
      mockedApi.delete.mockResolvedValue({ data: mockDeleted });

      const result = await productService.deleteProduct(1);

      expect(result.isDeleted).toBe(true);
    });
  });
});
