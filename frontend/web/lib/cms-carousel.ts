import type { CarouselSlide } from "@/components/organisms/Carousel/slides";

type CmsCarouselItem = {
  _id: string;
  image?: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;
  isActive?: boolean;
};

const CMS_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5000/api";

const resolveCmsImageUrl = (image?: string): string => {
  if (!image) return "";

  const value = image.trim();

  if (!value) return "";

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("data:image/")) {
    return value;
  }

  if (value.startsWith("localhost:") || value.startsWith("127.0.0.1:")) {
    return `http://${value}`;
  }

  if (value.startsWith("uploads/") || value.startsWith("/uploads/")) {
    return "";
  }

  return "";
};

const mapCmsCarouselToUi = (item: CmsCarouselItem): CarouselSlide => ({
  imageSrc: resolveCmsImageUrl(item.image),
  imageAlt: item.title,
  title: item.title,
  kicker: item.subtitle,
  description: item.description ?? "",
  ctaLabel: item.ctaLabel ?? "",
  ctaHref: item.ctaLink ?? "",
});

export const fetchCarouselSlides = async (): Promise<CarouselSlide[]> => {
  try {
    const response = await fetch(`${CMS_API_BASE_URL}/carousels?isActive=true`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as CmsCarouselItem[];
    return data.map(mapCmsCarouselToUi);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return [];
  }
};
