import apiClient from "@/src/services/api/client";
import type { Product, ProductPayload } from "@/src/types/product";

const toFormData = (payload: Partial<ProductPayload>) => {
  const formData = new FormData();

  if (payload.category !== undefined) formData.append("category", payload.category);
  if (payload.title !== undefined) formData.append("title", payload.title);
  if (payload.description !== undefined) formData.append("description", payload.description);
  if (payload.priceFrom !== undefined) formData.append("priceFrom", String(payload.priceFrom));
  if (payload.ctaLabel !== undefined) formData.append("ctaLabel", payload.ctaLabel);
  if (payload.ctaLink !== undefined) formData.append("ctaLink", payload.ctaLink);
  if (payload.displayOrder !== undefined) formData.append("displayOrder", String(payload.displayOrder));

  if (payload.imageFile) {
    formData.append("image", payload.imageFile);
  } else if (payload.image !== undefined) {
    formData.append("image", payload.image);
  }

  return formData;
};

export const getProducts = async (category?: "estaca" | "blindagem"): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>("/products", {
    params: category ? { category } : undefined,
  });
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (payload: ProductPayload): Promise<Product> => {
  const response = await apiClient.post<Product>("/products", toFormData(payload), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProduct = async (
  id: string,
  payload: Partial<ProductPayload>
): Promise<Product> => {
  const response = await apiClient.put<Product>(`/products/${id}`, toFormData(payload), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const response = await apiClient.delete<{ message: string }>(`/products/${id}`);
  return response.data;
};

export const deactivateProduct = async (id: string): Promise<Product> => {
  const response = await apiClient.patch<Product>(`/products/${id}/deactivate`);
  return response.data;
};

export const activateProduct = async (id: string): Promise<Product> => {
  const response = await apiClient.patch<Product>(`/products/${id}/activate`);
  return response.data;
};
