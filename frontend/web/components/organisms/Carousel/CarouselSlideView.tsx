import Box from "@mui/material/Box";
import Heading from "../../atoms/Heading";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import theme from "../../../styles/theme";
import type { CarouselSlide } from "./slides";

export default function CarouselSlideView({ slide }: { slide: CarouselSlide }) {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.colors.accent,
        color: theme.colors.surface,
      }}
    >
      {slide.imageSrc ? (
        <Box
          sx={{
            width: "100%",
            height: "var(--carousel-image-height)",
            overflow: "hidden",
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",
          }}
        >
          <Box
            component="img"
            src={slide.imageSrc}
            alt={slide.imageAlt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
      ) : null}

      <Box
        sx={{
          width: "100%",
          maxWidth: "var(--carousel-content-max-width)",
          mx: "auto",
          px: { xs: "24px", md: "160px" },
          pt: "24px",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
          alignItems: { xs: "start", md: "start" },
        }}
      >
        <Box sx={{ display: "grid"}}>
          <Heading
            sx={{
              color: theme.colors.surface,
              fontSize: theme.typography.heading.displayMd,
              "@media (min-width:900px)": {
                fontSize: theme.typography.heading.displayLg,
              },
              "@media (min-width:1201px)": {
                fontSize: theme.typography.heading.displayXl,
              },
            }}
          >
            {slide.title}
          </Heading>
        </Box>
        <Box sx={{ display: "grid", gap: "10px" }}>
          {slide.kicker ? (
            <Text
              sx={{
                color: theme.colors.surface,
                fontSize: { xs: theme.typography.text.base, md: theme.typography.text.sm },
                fontWeight: 700,
              }}
            >
              {slide.kicker}
            </Text>
          ) : null}

          <Text sx={{ color: theme.colors.surface, fontSize: theme.typography.text.xxl }}>
            {slide.description}
          </Text>

          <Box sx={{ pt: "6px" }}>
            <Button
              onClick={slide.onCtaClick}
              href={slide.ctaHref || undefined}
              disableElevation
              sx={{
                backgroundColor: "#fed203",
                color: theme.colors.textPrimary,
                borderRadius: "4px",
                textTransform: "uppercase",
                fontWeight: 800,
                letterSpacing: "0.06em",
                fontSize: theme.typography.text.xl,
                minHeight: { xs: "28px", md: "18px" },
                px: { xs: "18px", md: "22px" },
                minWidth: { xs: "160px", md: "180px" },
                "&:hover": {
                  backgroundColor: "#b19302",
                  transform: "none",
                },
              }}
            >
              {slide.ctaLabel}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
