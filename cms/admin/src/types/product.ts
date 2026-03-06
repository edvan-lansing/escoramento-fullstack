export interface Product {
  _id: string;
  category?: "estaca" | "blindagem";
  image?: string;
  title: string;
  description?: string;
  priceFrom?: string;
  ctaLabel?: string;
  ctaLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPayload {
  category?: "estaca" | "blindagem";
  image?: string;
  imageFile?: File | null;
  title: string;
  description?: string;
  priceFrom?: string;
  ctaLabel?: string;
  ctaLink?: string;
}
