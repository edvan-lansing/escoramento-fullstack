import Box from "@mui/material/Box";
import { useLocale, useTranslations } from "next-intl";
import ProductsGrid from "./ProductsGrid";
import ProductCategory from "./ProductCategory";
import PromoCard from "./PromoCard";
import FeaturedPromoCard from "./FeaturedPromoCard";
import ResourcesCard from "./ResourcesCard";
import SearchBar from "./SearchBar";
import SectionHeader from "./SectionHeader";
import type { Product, PromoBlock } from "./types";
import theme from "../../../styles/theme";

type ProductsSectionProps = {
  title?: string;
  subtitle?: string;
  products?: Product[];
};

export default function ProductsSection({
  title,
  subtitle,
  products,
}: ProductsSectionProps) {
  const t = useTranslations("Products");
  const locale = useLocale();
  const baseUrl = `https://escoramento.com/${locale}`;
  const resolvedTitle = title ?? t("sectionTitle");
  const resolvedSubtitle = subtitle ?? t("sectionSubtitle");
  const resolvedProducts = products ?? [];
  const sheetPiles = resolvedProducts.filter((p) => p.category === "estaca");
  const trenchShielding = resolvedProducts.filter((p) => p.category === "blindagem");
  const materialTecnicoBlock: PromoBlock = {
    id: "technical",
    title: t("promo.technical.title"),
    label: t("promo.technical.label"),
    cardTitle: t("promo.technical.cardTitle"),
    description: t("promo.technical.description"),
    ctaLabel: t("accessContent"),
    href: `${baseUrl}/catalogs/`,
    imageSrc: "/materialTecnico.webp",
    imageAlt: t("promo.technical.imageAlt"),
  };

  const recursosBlock: PromoBlock = {
    id: "resources",
    title: t("promo.resources.title"),
    subtitle: t("promo.resources.subtitle"),
    label: t("promo.resources.label"),
    cardTitle: t("promo.resources.cardTitle"),
    description: t("promo.resources.description"),
    ctaLabel: t("accessContent"),
    href: "https://blog.escoramento.com/",
    imageSrc: "/recursos.webp",
    imageAlt: t("promo.resources.imageAlt"),
  };

  const featuredPromoBlocks: PromoBlock[] = [
    {
      id: "schedule",
      title: t("featured.schedule.title"),
      label: t("featured.schedule.label"),
      cardTitle: t("featured.schedule.cardTitle"),
      description: t("featured.schedule.description"),
      ctaLabel: t("featured.schedule.ctaLabel"),
      href: `${baseUrl}/schedule/`,
      imageSrc: "/agendamento.webp",
      imageAlt: t("featured.schedule.imageAlt"),
    },
    {
      id: "credit",
      title: t("featured.credit.title"),
      label: t("featured.credit.label"),
      cardTitle: t("featured.credit.cardTitle"),
      description: t("featured.credit.description"),
      ctaLabel: t("featured.credit.ctaLabel"),
      href: `${baseUrl}/app/?tab=credit-analysis`,
      imageSrc: "/credito.webp",
      imageAlt: t("featured.credit.imageAlt"),
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        backgroundColor: theme.colors.surface,
        pb: "64px",
        pt: "24px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          px: theme.layout.containerPadding,
          "@media (min-width:1080px)": {
            maxWidth: "1200px",
            mx: "auto",
          },
        }}
      >
        <SearchBar />
        <SectionHeader title={resolvedTitle} subtitle={resolvedSubtitle} />

        <Box sx={{ display: "grid" }}>
          <ProductCategory title={t("categories.sheetPiles")} products={sheetPiles} />
          <ProductCategory
            title={t("categories.trenchShielding")}
            products={trenchShielding}
          />

          {!resolvedProducts.length ? (
            <Box sx={{ px: "24px", pt: "16px" }}>
              <ProductsGrid products={[]} />
            </Box>
          ) : null}
        </Box>

        <Box sx={{ mt: { xs: "44px", md: "56px" }, display: "grid", gap: "26px" }}>
          <PromoCard block={materialTecnicoBlock} />
          <ResourcesCard block={recursosBlock} />

          {featuredPromoBlocks.map((block) => (
            <FeaturedPromoCard key={block.id} block={block} />
          ))}
        </Box>
      </Box>
    </Box>
  );

}

