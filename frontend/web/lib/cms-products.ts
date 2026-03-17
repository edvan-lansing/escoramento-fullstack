import type { Product } from "@/components/organisms/ProductsSection/types";

type CmsCategory = "estaca" | "blindagem";

type CmsProduct = {
  _id: string;
  category?: CmsCategory;
  image?: string;
  title: string;
  description?: string;
  priceFrom?: string;
  ctaLabel?: string;
  ctaLink?: string;
};

const CMS_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5000/api";

const resolveCmsImageUrl = (image?: string): string => {
  if (!image) return "";

  const value = image.trim();
  const cmsBaseUrl = CMS_API_BASE_URL.replace(/\/api$/, "");

  if (!value) return "";

  if (value.startsWith("http://localhost:") || value.startsWith("https://localhost:") || value.startsWith("http://127.0.0.1:") || value.startsWith("https://127.0.0.1:")) {
    try {
      const parsed = new URL(value);
      if (parsed.pathname.startsWith("/uploads/")) {
        return `${cmsBaseUrl}${parsed.pathname}`;
      }
      return "";
    } catch {
      return "";
    }
  }

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
    return `${cmsBaseUrl}${value.startsWith("/") ? "" : "/"}${value}`;
  }

  return "";
};

const mapCmsProductToUi = (product: CmsProduct): Product => ({
  category: product.category,
  imageSrc: resolveCmsImageUrl(product.image),
  imageAlt: product.title,
  title: product.title,
  description: product.description ?? "",
  priceFrom: product.priceFrom,
  ctaLabel: product.ctaLabel,
  href: product.ctaLink,
});

export const fetchProducts = async (category: CmsCategory): Promise<Product[]> => {
  try {
    const response = await fetch(`${CMS_API_BASE_URL}/products?category=${category}&isActive=true`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as CmsProduct[];
    return data.map(mapCmsProductToUi);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return [];
  }
};
