import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1).email().transform((v) => v.toLowerCase()),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(1).email().transform((v) => v.toLowerCase()),
  password: z.string().min(8),
});