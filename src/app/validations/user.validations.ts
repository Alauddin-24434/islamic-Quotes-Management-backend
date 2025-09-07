import { z } from "zod";

// =======================
// Create User Validation
// =======================
export const createUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]).optional(),
  avatar: z.string().url().optional(),
});

// =======================
// Login User Validation
// =======================
export const loginUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});

// =======================
// Update User Validation (only name & avatar allowed)
// =======================
export const updateUserSchema = z.object({
  name: z.string().optional(),
  avatar: z.string().url().optional(),
}).refine((data) => data.name || data.avatar, {
  message: "At least 'name' or 'avatar' must be provided",
});
