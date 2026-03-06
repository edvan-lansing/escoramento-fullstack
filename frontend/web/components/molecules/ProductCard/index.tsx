import Heading from "../../atoms/Heading";
import Text from "../../atoms/Text";
import Card from "../Card";
import Box from "@mui/material/Box";
import theme from "../../../styles/theme";
import { Button, ShoppingCartIcon } from "@/components/atoms";
import { useTranslations } from "next-intl";

type ProductCardProps = {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: string;
  priceFrom?: string;
  ctaLabel?: string;
  href?: string;
};

export default function ProductCard({
  imageSrc,
  imageAlt = "",
  title,
  description,
  priceFrom,
  ctaLabel,
  href,
}: ProductCardProps) {
  const t = useTranslations("Products");
  const resolvedCtaLabel = ctaLabel ?? t("viewPrices");

  return (
    <Card
      component={href ? "a" : "div"}
      {...(href && { href })}
      variant="elevation"
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        cursor: href ? "pointer" : "default",
        position: "relative",
        willChange: "transform",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",

        "@media (hover: hover) and (pointer: fine)": {
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: theme.shadow.sm,
          },
        },

        "&:active": {
          transform: "translateY(-3px)",
          boxShadow: theme.shadow.sm,
        },

        "&:focus-visible": {
          transform: "translateY(-3px)",
          boxShadow: theme.shadow.sm,
        },
      }}
    >
      {imageSrc ? (
        <Box
          sx={{
            backgroundColor: theme.colors.card,
            borderRadius: theme.radius.sm,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            aspectRatio: "1 / 1",
            p: { xs: "14px", md: "18px" },
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={imageSrc}
            alt={imageAlt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Box>
      ) : null}
      <Box sx={{ pt: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
          <Heading
            sx={{
              fontSize: theme.typography.heading.md,
              lineHeight: 1.25,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              minHeight: "2.5em",
            }}
          >
            {title}
          </Heading>
          <Text
            $muted
            sx={{
              lineHeight: 1.6,
              fontSize: {
                xs: theme.typography.text.sm,
                md: theme.typography.text.base,
              },
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              minHeight: "4.8em",
            }}
          >
            {description}
          </Text>
        </Box>

        <Box sx={{ mt: "auto", display: "grid", gap: "10px" }}>
          <Text
            sx={{
              minHeight: "1.6em",
              whiteSpace: "nowrap",
              ...(priceFrom ? null : { visibility: "hidden" }),
              fontSize: {
                xs: theme.typography.text.sm,
                md: theme.typography.text.base,
              },
            }}
          >
            {priceFrom ?? "_"}
          </Text>
          <Button
            fullWidth
            disableElevation
            startIcon={<ShoppingCartIcon size={18} />}
            sx={{
              minHeight: "36px",
              width: "100%",
              backgroundColor: theme.colors.footer,
              color: theme.colors.surface,
              textTransform: "uppercase",
              fontWeight: 500,
              borderRadius: theme.radius.xsm,
              fontSize: theme.typography.text.sm,
              px: "12px",
              "& .MuiButton-startIcon": {
                marginRight: "8px",
              },
              ":hover": {
                backgroundColor: theme.colors.bottomBar,
                color: theme.colors.surface,
                transform: "none",
              },
            }}
          >
            {resolvedCtaLabel}
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
