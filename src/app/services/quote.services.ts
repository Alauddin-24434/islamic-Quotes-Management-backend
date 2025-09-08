import { IQuote } from "../interfaces/quote.interface";
import { Quote } from "../models/quote.model";

// ==============================================
// Create New Quote (User can add, default: not approved)
// ==============================================
const createQuoteIntoDb = async (payload: IQuote) => {
  const newQuote = await Quote.create(payload);
  return newQuote;
};

// ==============================================
// Get All Quotes (For Everyone, only approved)
// ==============================================
const getAllQuotesIntoDb = async () => {
  const quotes = await Quote.find({ approved: true }).populate("createdBy", "name");
  return quotes;
};

// ==============================================
// Get All Unapproved Quotes (Admin only)
// ==============================================
const getUnapprovedQuotesFromDb = async () => {
  const quotes = await Quote.find({ approved: false }).populate("createdBy", "name email");
  return quotes;
};

// ==============================================
// Get Quote by ID
// ==============================================
const getQuoteByIdFromDb = async (id: string) => {
  return Quote.findById(id).populate("createdBy", "name email");
};

// ==============================================
// Update Quote (Admin can approve/edit)
// ==============================================
const updateQuoteByIdIntoDb = async (
  id: string,
  payload: Partial<IQuote>
) => {
  return Quote.findByIdAndUpdate(id, payload, { new: true });
};

// ==============================================
// Delete Quote (Admin only)
// ==============================================
const deleteQuoteByIdFromDb = async (id: string) => {
  return Quote.findByIdAndDelete(id);
};

// ==============================================
// Export Quote Services
// ==============================================
export const quoteServices = {
  createQuoteIntoDb,
  getAllQuotesIntoDb,
  getUnapprovedQuotesFromDb,  // 🔥 New service for admin
  getQuoteByIdFromDb,
  updateQuoteByIdIntoDb,
  deleteQuoteByIdFromDb,
};
