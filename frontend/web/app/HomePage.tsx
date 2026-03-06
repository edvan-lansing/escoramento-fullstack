import Carousel from "@organisms/Carousel";
import ProductsSection from "@organisms/ProductsSection";
import PageLayout from "@templates/PageLayout";
import { fetchProducts } from "@/lib/cms-products";

export default async function HomePage() {
  const [sheetPilesProducts, trenchShieldingProducts] = await Promise.all([
    fetchProducts("estaca"),
    fetchProducts("blindagem"),
  ]);

  return (
    <PageLayout>
      <Carousel />
      <ProductsSection
        products={[...sheetPilesProducts, ...trenchShieldingProducts]}
      />
    </PageLayout>
  );
}
