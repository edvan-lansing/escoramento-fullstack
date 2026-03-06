import Box from "@mui/material/Box";
import ProductCard from "../../../molecules/ProductCard";
import type { Product } from "../types";

type ProductsGridProps = {
	products: Product[];
};

export default function ProductsGrid({ products }: ProductsGridProps) {
	return (
		<Box
			sx={{
				display: "grid",
				px: "24px",
				gap: "24px",
				gridTemplateColumns: {
					xs: "repeat(2, minmax(0, 1fr))",
					sm: "repeat(auto-fit, minmax(240px, 1fr))",
				},
				"@media (min-width:1080px)": {
					gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
				},
                pt: "10px",
				alignItems: "stretch",
				"& > *": { height: "100%" },
			}}
		>
			{products.map((product) => (
				<ProductCard
					key={product.title}
					imageSrc={product.imageSrc}
					imageAlt={product.imageAlt}
					title={product.title}
					description={product.description}
					priceFrom={product.priceFrom}
					ctaLabel={product.ctaLabel}
					href={product.href}
				/>
			))}
		</Box>
	);
}
