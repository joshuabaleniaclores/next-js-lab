import api from "@/lib/axios";
import type { Product, DeletedProduct, ProductsResponse, AddProductPayload, UpdateProductPayload } from "@/types/product.types";

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

  async updateProduct(id: number, payload: UpdateProductPayload): Promise<Product> {
    const response = await api.patch<Product>(`/products/${id}`, payload);
    return response.data;
  },

  async deleteProduct(id: number): Promise<DeletedProduct> {
    const response = await api.delete<DeletedProduct>(`/products/${id}`);
    return response.data;
  },
};
