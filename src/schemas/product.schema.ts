import { z } from "zod";

const VALIDATION = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  PRICE_MIN: 0.01,
  BRAND_MIN: 1,
  CATEGORY_MIN: 1,
} as const;

export const addProductSchema = z.object({
  title: z
    .string()
    .min(VALIDATION.TITLE_MIN, "Title is required")
    .max(VALIDATION.TITLE_MAX, `Title must be at most ${VALIDATION.TITLE_MAX} characters`)
    .trim(),
  price: z
    .number({ error: "Price must be a number" })
    .min(VALIDATION.PRICE_MIN, `Price must be at least $${VALIDATION.PRICE_MIN}`),
  category: z
    .string()
    .min(VALIDATION.CATEGORY_MIN, "Category is required")
    .trim(),
  brand: z
    .string()
    .min(VALIDATION.BRAND_MIN, "Brand is required")
    .trim(),
});

export type AddProductFormValues = z.infer<typeof addProductSchema>;
