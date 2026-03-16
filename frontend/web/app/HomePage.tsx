import Carousel from "@organisms/Carousel";
import ProductsSection from "@organisms/ProductsSection";
import PageLayout from "@templates/PageLayout";
import { fetchProducts } from "@/lib/cms-products";
import { fetchCarouselSlides } from "@/lib/cms-carousel";

export default async function HomePage() {
  const [sheetPilesProducts, trenchShieldingProducts, carouselSlides] = await Promise.all([
    fetchProducts("estaca"),
    fetchProducts("blindagem"),
    fetchCarouselSlides(),
  ]);

  return (
    <PageLayout>
      <Carousel slides={carouselSlides} />
      <ProductsSection
        products={[...sheetPilesProducts, ...trenchShieldingProducts]}
      />
    </PageLayout>
  );
}
