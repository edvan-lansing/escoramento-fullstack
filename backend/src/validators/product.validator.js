const { z } = require("zod");

const productSchema = z.object({
  category: z.enum(["estaca", "blindagem"]),
  image: z.string().trim().optional(),
  title: z.string().trim().min(1, "title is required"),
  description: z.string().trim().optional(),
  priceFrom: z.string().trim().optional(),
  ctaLabel: z.string().trim().optional(),
  ctaLink: z.string().trim().optional(),
});

const updateProductSchema = productSchema.partial();

module.exports = { productSchema, updateProductSchema };
