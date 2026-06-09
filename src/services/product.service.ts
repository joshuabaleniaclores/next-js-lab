import api from "@/lib/axios";
import type { Product, ProductsResponse, AddProductPayload } from "@/types/product.types";

export const productService = {
  async getProducts(params?: { limit?: number; skip?: number }): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>("/products", { params });
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  async addProduct(payload: AddProductPayload): Promise<Product> {
    const response = await api.post<Product>("/products/add", payload);
    return response.data;
  },
};
