export interface CarouselItem {
  _id: string;
  image?: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;
  displayOrder?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CarouselPayload {
  image?: string;
  imageFile?: File | null;
  title: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;
  displayOrder?: number;
}
