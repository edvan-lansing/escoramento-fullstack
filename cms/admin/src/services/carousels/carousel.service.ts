import apiClient from "@/src/services/api/client";
import type { CarouselItem, CarouselPayload } from "@/src/types/carousel";

const toFormData = (payload: Partial<CarouselPayload>) => {
  const formData = new FormData();

  if (payload.title !== undefined) formData.append("title", payload.title);
  if (payload.subtitle !== undefined) formData.append("subtitle", payload.subtitle);
  if (payload.description !== undefined) formData.append("description", payload.description);
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

export const getCarouselItems = async (): Promise<CarouselItem[]> => {
  const response = await apiClient.get<CarouselItem[]>("/carousels");
  return response.data;
};

export const createCarouselItem = async (payload: CarouselPayload): Promise<CarouselItem> => {
  const response = await apiClient.post<CarouselItem>("/carousels", toFormData(payload), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateCarouselItem = async (
  id: string,
  payload: Partial<CarouselPayload>
): Promise<CarouselItem> => {
  const response = await apiClient.put<CarouselItem>(`/carousels/${id}`, toFormData(payload), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deactivateCarouselItem = async (id: string): Promise<CarouselItem> => {
  const response = await apiClient.patch<CarouselItem>(`/carousels/${id}/deactivate`);
  return response.data;
};

export const activateCarouselItem = async (id: string): Promise<CarouselItem> => {
  const response = await apiClient.patch<CarouselItem>(`/carousels/${id}/activate`);
  return response.data;
};

export const deleteCarouselItem = async (id: string): Promise<{ message: string }> => {
  const response = await apiClient.delete<{ message: string }>(`/carousels/${id}`);
  return response.data;
};
