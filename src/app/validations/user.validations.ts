import { z } from "zod";

// =======================
// Create User Validation
// =======================
export const createUserValidayionSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]).optional(),
  avatar: z.string().url().optional(),
});

// =======================
// Login User Validation
// =======================
export const loginUserValidationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});

