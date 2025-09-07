import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../error/appError";
import { envVariable } from "../config";
import { User } from "../models/user.model";



// ============================
// Authentication Middleware
// ============================
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get token from header or cookie
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies?.accessToken;

        if (!token) {
            throw new AppError(401, "Access token not found");
        }

        // Verify token
        const decoded = jwt.verify(token, envVariable.jwt_access_token_secret) as { _id: string; role: string; email: string };

        // Find user in DB
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new AppError(401, "Invalid token: user not found");
        }

        // Attach user to request object
        req.user = {
            _id: String(user._id),
            role: user.role,
            email: user.email,
        };

        next();
    } catch (error) {
        next(new AppError(401, "Unauthorized: invalid or expired token"));
    }
};
