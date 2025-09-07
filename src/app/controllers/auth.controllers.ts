import { Request, Response, NextFunction } from "express";
import { authServices } from "../services/auth.services";
import { sendResponse } from "../utills/sendResponse";
import { envVariable } from "../config";
import { catchAsync } from "../utills/catchAsync";
import { AppError } from "../error/appError";

// ====================================================================
//  CREATE USER 
// ====================================================================
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const { user, accessToken, refreshToken } = await authServices.createUserIntoDb(body);

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: envVariable.node_env === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: { user, accessToken },
    });
  }
);

// =============================================================================
//  LOGIN USER 
// ==============================================================================
const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const { user, accessToken, refreshToken } = await authServices.loginUserIntoDb(body);

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: envVariable.node_env === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Login successful",
      data: { user, accessToken },
    });
  }
);

// ====================================================================
//  REFRESH TOKEN 
// =====================================================================
const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.refreshToken;

    if (!token) {
      throw new AppError(401, "Refresh token not found in cookies");
    }

    // Generate new access token
    const { accessToken } = await authServices.refreshAccessToken(token);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "New access token generated successfully",
      data: { accessToken },
    });
  }
);

// ==================================================
//  EXPORT CONTROLLERS 
// ==================================================
export const authControllers = {
  createUser,
  loginUser,
  refreshToken,
};
