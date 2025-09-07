
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utills/catchAsync";
import { userServices } from "../services/user.services";
import { envVariable } from "../config";
import { sendResponse } from "../utills/sendResponse";
import { AppError } from "../error/appError";
// ==============================================================================
// Get all users
// ==============================================================================
const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userServices.getAllUsersFromDb();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  }
);

// ==============================================================================
// Get user by ID
// ==============================================================================
const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const user = await userServices.getUserByIdFromDb(userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User retrieved successfully",
      data: user,
    });
  }
);


// ==============================================================================
// Update user byId
//================================================================================
const updateUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId= req.params.id;
   const body = { ...req.body };
   // Throw error if avatar is required but file not provided
    if (!req.file?.path) {
      throw new AppError(400, "Avatar file is required");
    }

    // Add avatar to body if file exists
    if (req.file?.path) {
      body.avatar = req.file.path;
    }


    const { safeUser, accessToken, refreshToken } = await userServices.updateUserByIdIntoDb(userId, body);

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
      data: { safeUser, accessToken },
    });
  }
);



//======================================================
// export user controllers
//======================================================

export const userControllers={
    updateUserById,
    getAllUsers,
    getUserById
    
}