import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTranslations } from "next-intl";
import theme from "../../../styles/theme";
import { ArrowBackIcon, ArrowForwardIcon } from "@/components/atoms/Icon";

type Props = {
  onPrev: () => void;
  onNext: () => void;
  children?: ReactNode;
};

export default function CarouselControls({ onPrev, onNext, children }: Props) {
  const t = useTranslations("Carousel");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "var(--carousel-content-max-width)",
        mx: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: "24px", md: "160px" },
        py: { xs: "8px", md: "6px" },
      }}
    >
      <IconButton
        aria-label={t("prevSlide")}
        onClick={onPrev}
        sx={{
          flex: "0 0 auto",
          color: theme.colors.surface,
          opacity: 0.9,
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          "&:hover": {
            backgroundColor: "transparent",
            opacity: 1,
          },
          "& svg": {
            width: { xs: 20, md: 24 },
            height: { xs: 20, md: 24 },
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>

      <IconButton
        aria-label={t("nextSlide")}
        onClick={onNext}
        sx={{
          flex: "0 0 auto",
          color: theme.colors.surface,
          opacity: 0.9,
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          "&:hover": {
            backgroundColor: "transparent",
            opacity: 1,
          },
          "& svg": {
            width: { xs: 20, md: 24 },
            height: { xs: 20, md: 24 },
          },
        }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}
