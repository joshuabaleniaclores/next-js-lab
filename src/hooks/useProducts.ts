"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productService } from "@/services/product.service";
import { extractApiError } from "@/utils/api-error";
import type { AddProductPayload, UpdateProductPayload, DeletedProduct, Product } from "@/types/product.types";

const PRODUCT_KEYS = {
  all: ["products"] as const,
  list: (params?: { limit?: number; skip?: number }) =>
    ["products", "list", params] as const,
  detail: (id: number) => ["products", "detail", id] as const,
};

export function useProducts(params?: { limit?: number; skip?: number }) {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: async () => {
      try {
        return await productService.getProducts(params);
      } catch (error) {
        throw extractApiError(error);
      }
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: async () => {
      try {
        return await productService.getProductById(id);
      } catch (error) {
        throw extractApiError(error);
      }
    },
    enabled: !!id,
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddProductPayload) => {
      try {
        return await productService.addProduct(payload);
      } catch (error) {
        throw extractApiError(error);
      }
    },
    onSuccess: (data: Product) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      toast.success(`"${data.title}" added successfully`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: UpdateProductPayload }) => {
      try {
        return await productService.updateProduct(id, payload);
      } catch (error) {
        throw extractApiError(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      toast.success(`"${data.title}" updated successfully`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      try {
        return await productService.deleteProduct(id);
      } catch (error) {
        throw extractApiError(error);
      }
    },
    onSuccess: (data: DeletedProduct) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      toast.success(`"${data.title}" deleted successfully`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
