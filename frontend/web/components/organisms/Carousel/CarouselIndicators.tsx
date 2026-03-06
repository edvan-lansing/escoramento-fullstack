import Box from "@mui/material/Box";
import theme from "../../../styles/theme";
import type { CarouselSlide } from "./slides";

type Props = {
  slides: CarouselSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function CarouselIndicators({ slides, activeIndex, onSelect }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {slides.map((slide, idx) => {
        const isActive = idx === activeIndex;
        return (
          <Box
            key={slide.imageSrc}
            component="button"
            type="button"
            aria-label={`Ir para o slide ${idx + 1}`}
            onClick={() => onSelect(idx)}
            sx={{
              width: isActive ? 12 : 8,
              height: isActive ? 12 : 8,
              borderRadius: "999px",
              border: "none",
              backgroundColor: theme.colors.surface,
              opacity: isActive ? 1 : 0.55,
              cursor: "pointer",
              padding: 0,
              transition: "width 160ms ease, height 160ms ease, opacity 160ms ease",
              flex: "0 0 auto",
              outlineOffset: "2px",
            }}
          />
        );
      })}
    </Box>
  );
}
