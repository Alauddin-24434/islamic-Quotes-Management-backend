// validations/validation.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

// ================================
// Generic Zod validation middleware
// ================================
export const validateBody = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body and assign type
      const parsedBody: T = schema.parse(req.body);
      req.body = parsedBody; // Replace body with validated and typed data
      next();
    } catch (err) {
      
      next(err); // Pass unknown errors to global error handler
    }
  };
};
