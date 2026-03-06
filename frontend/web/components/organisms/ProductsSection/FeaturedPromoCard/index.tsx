import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "../../../atoms/Button";
import Heading from "../../../atoms/Heading";
import Text from "../../../atoms/Text";
import theme from "../../../../styles/theme";
import type { PromoBlock } from "../types";

type FeaturedPromoCardProps = {
  block: PromoBlock;
};

export default function FeaturedPromoCard({ block }: FeaturedPromoCardProps) {
  const isCredito = block.id === "credit";

  return (
    <Box key={block.id} sx={{ mt: "8px", mb: "48px" }}>
      <Heading
        sx={{
          mb: "12px",
          pl: "24px",
          fontSize: {
            xs: theme.typography.heading.displaySm,
            md: theme.typography.heading.displayLg,
          },
        }}
      >
        {block.title}
      </Heading>

      <Box
        sx={{
          overflow: "hidden",
          minHeight: { xs: 300, md: 390 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: isCredito ? "1.6fr 0.9fr" : "0.9fr 1.6fr",
          },
          gridTemplateAreas: {
            xs: '"image" "content"',
            md: isCredito ? '"image content"' : '"content image"',
          },
        }}
      >
        <Box
          sx={{
            gridArea: "image",
            position: "relative",
            minHeight: { xs: 200, md: 390 },
          }}
        >
          <Box
            component="img"
            src={block.imageSrc}
            alt={block.imageAlt}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        <Box
          sx={{
            gridArea: "content",
            position: "relative",
            zIndex: 1,
            p: { xs: "18px", md: "30px" },
            minHeight: { xs: 200, md: 390 },
            display: "flex",
            alignItems: "center",
            mt: { xs: "-28px", md: 0 },
            justifyContent: {
              xs: "center",
              md: isCredito ? "flex-end" : "flex-start",
            },
            ml: { xs: 0, md: isCredito ? "-20%" : 0 },
            mr: { xs: 0, md: isCredito ? 0 : "-20%" },
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.border}`,
              boxShadow: theme.shadow.sm,
              p: { xs: "16px", md: "18px" },
              display: "grid",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: theme.typography.heading.lg,
                  md: theme.typography.heading.xxl,
                },
              }}
            >
              {block.cardTitle ?? block.title}
            </Typography>
            <Text $muted sx={{ color: theme.colors.textPrimary }}>
              {block.description}
            </Text>
            <Box sx={{ mt: "6px" }}>
              <Button
                component="a"
                href={block.href}
                sx={{
                  backgroundColor: theme.colors.footer,
                  color: theme.colors.surface,
                  textTransform: "uppercase",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  ":hover": {
                    backgroundColor: theme.colors.bottomBar,
                    color: theme.colors.surface,
                  },
                }}
              >
                {block.ctaLabel}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
