const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email().transform((v) => v.toLowerCase().trim()),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email().transform((v) => v.toLowerCase().trim()),
  password: z.string().min(1),
});

module.exports = { registerSchema, loginSchema };
