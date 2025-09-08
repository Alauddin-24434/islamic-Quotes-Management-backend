import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utills/catchAsync";
import { sendResponse } from "../utills/sendResponse";
import { AppError } from "../error/appError";
import { quoteServices } from "../services/quote.services";

// ==============================================================================
// Get all quotes (only approved for public)
// ==============================================================================
const getAllQuotes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const quotes = await quoteServices.getAllQuotesIntoDb();


    if (quotes.length < 1) {
      return sendResponse(res, {
        success: true, 
        statusCode: 200,
        message: "No quotes found",
        data: [],
      });
    }
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Quotes retrieved successfully",
      data: quotes,
    });
  }
);

// ==============================================================================
// Get all unapproved quotes (Admin only)
// ==============================================================================
const getUnapprovedQuotes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const isAdmin = (req as any).user?.role === "admin";
    if (!isAdmin) {
      throw new AppError(403, "Forbidden - Only admins can view unapproved quotes");
    }

    const quotes = await quoteServices.getUnapprovedQuotesFromDb();
    if (quotes.length < 1) {
      return sendResponse(res, {
        success: true, 
        statusCode: 200,
        message: "No quotes found",
        data: [],
      });
    }
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Unapproved quotes retrieved successfully",
      data: quotes,
    });
  }
);

// ==============================================================================
// Get quote by ID
// ==============================================================================
const getQuoteById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const quoteId = req.params.id;
    const quote = await quoteServices.getQuoteByIdFromDb(quoteId);

    if (!quote) {
      throw new AppError(404, "Quote not found");
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Quote retrieved successfully",
      data: quote,
    });
  }
);

// ==============================================================================
// Create new quote (user only, initially not approved)
// ==============================================================================
const createQuote = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   
    const body = req.body;
    const newQuote = await quoteServices.createQuoteIntoDb(body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Quote submitted successfully, pending approval",
      data: newQuote,
    });
  }
);

// ==============================================================================
// Update quote (admin only, approve/edit)
// ==============================================================================
const updateQuoteById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const quoteId = req.params.id;

    const updatedQuote = await quoteServices.updateQuoteByIdIntoDb(
      quoteId,
      req.body
    );

    if (!updatedQuote) {
      throw new AppError(404, "Quote not found");
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Quote updated successfully",
      data: updatedQuote,
    });
  }
);

// ==============================================================================
// Delete quote (admin only)
// ==============================================================================
const deleteQuoteById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const quoteId = req.params.id;

    const deletedQuote = await quoteServices.deleteQuoteByIdFromDb(quoteId);

    if (!deletedQuote) {
      throw new AppError(404, "Quote not found");
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Quote deleted successfully",
      data: deletedQuote,
    });
  }
);

// ==============================================================================
// Export controllers
// ==============================================================================
export const quoteControllers = {
  getAllQuotes,
  getUnapprovedQuotes,
  getQuoteById,
  createQuote,
  updateQuoteById,
  deleteQuoteById,
};
