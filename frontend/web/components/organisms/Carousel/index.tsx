"use client";

import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";
import theme from "../../../styles/theme";
import { getDefaultSlides, type CarouselSlide } from "./slides";
import CarouselSlideView from "./CarouselSlideView";
import CarouselControls from "./CarouselControls";
import CarouselIndicators from "./CarouselIndicators";

type CarouselProps = {
   slides?: CarouselSlide[];
   autoPlay?: boolean;
   intervalMs?: number;
};

export default function Carousel({
   slides,
   autoPlay = true,
   intervalMs = 5000,
}: CarouselProps) {
   const t = useTranslations("Carousel");
   const resolvedSlides = useMemo(() => slides ?? getDefaultSlides(t), [slides, t]);
   const [activeIndex, setActiveIndex] = useState(0);

   useEffect(() => {
      if (!autoPlay) return;
      if (resolvedSlides.length <= 1) return;

      const id = window.setInterval(() => {
         setActiveIndex((prev) => (prev + 1) % resolvedSlides.length);
      }, intervalMs);

      return () => window.clearInterval(id);
   }, [autoPlay, intervalMs, resolvedSlides.length]);

   const goTo = (nextIndex: number) => {
      if (resolvedSlides.length === 0) return;
      const normalized = ((nextIndex % resolvedSlides.length) + resolvedSlides.length) % resolvedSlides.length;
      setActiveIndex(normalized);
   };

   if (resolvedSlides.length === 0) return null;

   return (
      <Box
         component="section"
         aria-roledescription="carousel"
         sx={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: theme.colors.accent,
            "--carousel-image-height": { xs: "264px", md: "430px" },
            "--carousel-content-padding-x": { xs: "18px", md: "160px" },
         }}
      >
         <Box
            sx={{
               display: "flex",
               width: "100%",
               transform: `translateX(-${activeIndex * 100}%)`,
               transition: "transform 400ms ease",
            }}
         >
            {resolvedSlides.map((slide) => (
               <Box key={slide.imageSrc} sx={{ flex: "0 0 100%" }}>
                  <CarouselSlideView slide={slide} />
               </Box>
            ))}
         </Box>
         {resolvedSlides.length > 1 ? (
            <>
               <CarouselControls
                  onPrev={() => goTo(activeIndex - 1)}
                  onNext={() => goTo(activeIndex + 1)}
               >
                  <CarouselIndicators
                     slides={resolvedSlides}
                     activeIndex={activeIndex}
                     onSelect={goTo}
                  />
               </CarouselControls>
            </>
         ) : null}
      </Box>
   );
}