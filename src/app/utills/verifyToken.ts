import jwt, { JwtPayload } from "jsonwebtoken";
import { envVariable } from "../config";
import { AppError } from "../error/appError";

export const verifyToken = (refreshToken: string): JwtPayload | string => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      envVariable.jwt_refresh_token_secret as string
    );
    return decoded; // decoded payload (id, role,email etc.)
  } catch (error) {
    throw new AppError(401, "Invalid or expired refresh token"); 
  }
};
