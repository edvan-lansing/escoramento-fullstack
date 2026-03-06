export type Product = {
  category?: "estaca" | "blindagem";
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: string;
  priceFrom?: string;
  ctaLabel?: string;
  href?: string;
};

export type PromoBlock = {
  id: string;
  title: string;
  subtitle?: string;
  label?: string;
  cardTitle?: string;
  description: string;
  ctaLabel: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};
