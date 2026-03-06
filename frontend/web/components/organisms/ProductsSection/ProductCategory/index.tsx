import Box from "@mui/material/Box";
import Heading from "../../../atoms/Heading";
import ProductsGrid from "../ProductsGrid";
import type { Product } from "../types";
import theme from "@/styles/theme";

type ProductCategoryProps = {
  title: string;
  products: Product[];
};

export default function ProductCategory({
  title,
  products,
}: ProductCategoryProps) {
  return (
      <Box sx={{ display: "grid", gap: "14px", fontWeight: 700 }}>
        <Heading
          sx={{
            px: "24px",
            pt: "36px",
            fontSize: {
              xs: theme.typography.heading.lg,
              md: theme.typography.heading.displaySm,
            },
          }}
        >
          {title}
        </Heading>
        <ProductsGrid products={products} />
      </Box>
  );
}
