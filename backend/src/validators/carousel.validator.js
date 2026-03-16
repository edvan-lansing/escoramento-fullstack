const { z } = require("zod");

const optionalIntegerField = z.preprocess((value) => {
  if (value === "" || value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return undefined;
    }

    return Number(trimmedValue);
  }

  return value;
}, z.number().int().min(0).optional());

const carouselSchema = z.object({
  image: z.string().trim().optional(),
  title: z.string().trim().min(1, "title is required"),
  subtitle: z.string().trim().optional(),
  description: z.string().trim().optional(),
  ctaLabel: z.string().trim().optional(),
  ctaLink: z.string().trim().optional(),
  displayOrder: optionalIntegerField,
  isActive: z.boolean().optional(),
});

const updateCarouselSchema = carouselSchema.partial();

module.exports = { carouselSchema, updateCarouselSchema };
