import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/appError";

// roleMiddleware: accept multiple roles
export const authorize =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new AppError(401, "Unauthorized: user not found"));
    }

    if (!allowedRoles.includes(user.role)) {
      return next(
        new AppError(
          403,
          "Forbidden: you do not have permission to access this resource"
        )
      );
    }

    next();
  };
