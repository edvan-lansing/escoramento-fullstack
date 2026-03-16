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

const CMS_API_BASE_URL = "http://localhost:5000/api";

const mapCmsProductToUi = (product: CmsProduct): Product => ({
  category: product.category,
  imageSrc: product.image,
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
