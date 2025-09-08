// =======================
// Create Quote Validation (Alternative Style)
// =======================

import { z } from "zod";

// Regex for MongoDB ObjectId (24 hex characters)
const objectIdRegex = /^[a-f\d]{24}$/i;

export const createQuoteValidationSchema = z.object({
  text: z
    .string()
    .min(3, { message: "Quote text must be at least 3 characters long" })
    .max(5000, { message: "Quote text cannot exceed 500 characters" }),

  author: z
    .string()
    .min(2, { message: "Author name must be at least 2 characters long" })
    .max(100, { message: "Author name cannot exceed 100 characters" }),
createdBy: z
    .string()
    .regex(objectIdRegex, "CreatedBy must be a valid MongoDB ObjectId"),

  approved: z.boolean().default(false),
});
