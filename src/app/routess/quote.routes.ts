import express from "express";
import { authenticate } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorigation";
import { quoteControllers } from "../controllers/quote.controlles";
import { validateBody } from "../middlewares/validateBody";
import { createQuoteValidationSchema } from "../validations/quote.validations";

const router = express.Router();

// =======================
// Get all approved quotes (public)
// =======================
router.get("/", quoteControllers.getAllQuotes);

// =======================
// Get all unapproved quotes (admin only)
// =======================
router.get(
  "/unapproved",
  authenticate,
  authorize("admin"),
  quoteControllers.getUnapprovedQuotes
);

// =======================
// Get quote by ID (public)
// =======================
router.get("/:id", quoteControllers.getQuoteById);

// =======================
// Create a new quote (user only)
// =======================
router.post(
  "/",
  authenticate,
  authorize("user"),
  validateBody(createQuoteValidationSchema),
  quoteControllers.createQuote
);

// =======================
// Update a quote by ID (admin only)
// =======================
router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  quoteControllers.updateQuoteById
);

// =======================
// Delete a quote by ID (user only)
// =======================
router.delete(
  "/:id",
  authenticate,
  authorize("user"),
  quoteControllers.deleteQuoteById
);

export const quoteRoutes = router;
