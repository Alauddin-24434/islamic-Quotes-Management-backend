import { IUser, Ilogin } from "../interfaces/user.interfcae";
import { User } from "../models/user.model";
import { AppError } from "../error/appError";
import { generateTokens } from "../utills/tokensGenerate";
import { verifyToken } from "../utills/verifyToken";

// =============================================================
// Create a new user in the database
// =============================================================
const createUserIntoDb = async (payload: IUser) => {
  const isExistUser = await User.findOne({ email: payload.email });
  if (isExistUser) {
    throw new AppError(400, "User already exists");
  }

  const newUser = await User.create(payload);

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens({
    _id: newUser._id,
    role: newUser.role,
    email: newUser.email,
  });

  return { user: newUser, accessToken, refreshToken };
};

// =============================================================
// Login user -> check credentials & issue tokens
// =============================================================
const loginUserIntoDb = async (payload: Ilogin) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isPasswordValid = await user.comparePassword(payload.password);
  if (!isPasswordValid) {
    throw new AppError(401, "Invalid credentials");
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens({
    _id: user._id,
    role: user.role,
    email: user.email,
  });

  return { user, accessToken, refreshToken };
};

// =============================================================
// Refresh token -> generate new access token
// =============================================================
const refreshAccessToken = async (refreshToken: string) => {


  // Verify refresh token
  const decoded = verifyToken(refreshToken) as { _id: string; role: string, email: string };
  console.log(decoded)

  // Check if user exists
  const user = await User.findById(decoded._id);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Generate new access token
  const { accessToken } = generateTokens({
    _id: user._id,
    role: user.role,
    email: user.email,
  });

  return { accessToken };
};

// =============================================================
// Export Auth Services
// =============================================================
export const authServices = {
  createUserIntoDb,
  loginUserIntoDb,
  refreshAccessToken,
};
