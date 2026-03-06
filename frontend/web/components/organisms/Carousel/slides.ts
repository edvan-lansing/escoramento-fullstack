export type CarouselSlide = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  kicker?: string;
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void;
};

export function getDefaultSlides(t: (key: string) => string): CarouselSlide[] {
  return [
    {
      imageSrc: "/carousel/carousel01.webp",
      imageAlt: t("slides.0.imageAlt"),
      title: t("slides.0.title"),
      kicker: t("slides.0.kicker"),
      description: t("slides.0.description"),
      ctaLabel: t("slides.0.ctaLabel"),
    },
    {
      imageSrc: "/carousel/carousel02.webp",
      imageAlt: t("slides.1.imageAlt"),
      title: t("slides.1.title"),
      kicker: t("slides.1.kicker"),
      description: t("slides.1.description"),
      ctaLabel: t("slides.1.ctaLabel"),
    },
    {
      imageSrc: "/carousel/carousel03.webp",
      imageAlt: t("slides.2.imageAlt"),
      title: t("slides.2.title"),
      kicker: t("slides.2.kicker"),
      description: t("slides.2.description"),
      ctaLabel: t("slides.2.ctaLabel"),
    },
    {
      imageSrc: "/carousel/carousel04.webp",
      imageAlt: t("slides.3.imageAlt"),
      title: t("slides.3.title"),
      kicker: t("slides.3.kicker"),
      description: t("slides.3.description"),
      ctaLabel: t("slides.3.ctaLabel"),
    },
    {
      imageSrc: "/carousel/carousel05.webp",
      imageAlt: t("slides.4.imageAlt"),
      title: t("slides.4.title"),
      kicker: t("slides.4.kicker"),
      description: t("slides.4.description"),
      ctaLabel: t("slides.4.ctaLabel"),
    },
  ];
}
