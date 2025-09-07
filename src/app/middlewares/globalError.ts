// middlewares/globalError.ts
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../error/appError";
import mongoose from "mongoose";

export const globalError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  
  let statusCode = 500;
  let message = "Something went wrong!";
  let errors: { field: string; message: string }[] = [];

  // Custom AppError
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  // Zod validation error
  else if (error instanceof ZodError) {

    statusCode = 400;
    message = "Validation failed";
    errors = error.issues.map(e => ({
      field: e.path.join("."),
      message: e.message,
    }));
  }
  // Mongoose validation error
  else if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Database validation failed";
    errors = Object.values(error.errors).map((err: any) => ({
      field: err.path,
      message: err.message,
    }));
  }
  // CastError (invalid ObjectId etc)
  else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${error.path}: ${error.value}`;
    errors = [{ field: error.path, message: message }];
  }

  // For AppError or unknown errors without specific fields
  if (errors.length === 0) {
    errors = [{ field: "general", message }];
  }

  res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};
