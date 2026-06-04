import { z } from "zod";

const VALIDATION = {
  USERNAME_MIN: 3,
  USERNAME_MAX: 20,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 64,
} as const;

const usernameSchema = z
  .string()
  .min(VALIDATION.USERNAME_MIN, `Username must be at least ${VALIDATION.USERNAME_MIN} characters`)
  .max(VALIDATION.USERNAME_MAX, `Username must be at most ${VALIDATION.USERNAME_MAX} characters`)
  .trim();

const passwordSchema = z
  .string()
  .min(VALIDATION.PASSWORD_MIN, `Password must be at least ${VALIDATION.PASSWORD_MIN} characters`)
  .max(VALIDATION.PASSWORD_MAX, `Password must be at most ${VALIDATION.PASSWORD_MAX} characters`);

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
