import { z } from "zod";

export const magicLinkSchema = z.object({
  email: z.string().min(1).email(),
});
