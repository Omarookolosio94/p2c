import { z } from "zod";

export const newUserSchema = z.object({
  name: z.string().min(1, "Your name is required. Please enter your name."),
  email: z.string().email("The email address you entered is invalid."),
  phoneNumber: z
    .string()
    .regex(/^\d{11}$/, "The phone number must be exactly 11 digits."),
});

export const authDataSchema = z.object({
  email: z.string().email("The email address you entered is invalid."),
});

export type NewUser = z.infer<typeof newUserSchema>;
export type AuthData = z.infer<typeof authDataSchema>;
