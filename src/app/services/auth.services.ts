import { IUser, Ilogin } from "../interfaces/user.interfcae";
import { User } from "../models/user.model";
import { AppError } from "../error/appError";
import { generateTokens } from "../utills/tokensGenerate";
import { verifyToken } from "../utills/verifyToken";

// ========================
// Create a new user
// ========================
const createUserIntoDb = async (payload: IUser) => {
    // Check if user already exists
    const isExistUser = await User.findOne({ email: payload.email });
    if (isExistUser) throw new AppError(400, "User already exists");

    // Create new user
    const newUser = await User.create(payload);

    // Generate access & refresh tokens
    const { accessToken, refreshToken } = generateTokens({
        _id: newUser._id,
        role: newUser.role,
        email: newUser.email,
    });

    // Convert user document to plain object and remove password
    const safeUser = newUser.toObject() as Partial<IUser>;
    delete safeUser.password;

    return { safeUser, accessToken, refreshToken };
};

// ========================
// Login user & issue tokens
// ========================
const loginUserIntoDb = async (payload: Ilogin) => {
    // Find user by email and include password
    const user = await User.findOne({ email: payload.email }).select("+password");
    if (!user) throw new AppError(404, "User not found");

    // Validate password
    const isPasswordValid = await user.comparePassword(payload.password);
    if (!isPasswordValid) throw new AppError(401, "Invalid credentials");

    // Generate access & refresh tokens
    const { accessToken, refreshToken } = generateTokens({
        _id: user._id,
        role: user.role,
        email: user.email,
    });

    // Convert user document to plain object and remove password
    const safeUser = user.toObject() as Partial<IUser>;
    delete safeUser.password;

    return { safeUser, accessToken, refreshToken };
};

// ========================
// Refresh access token
// ========================
const refreshAccessToken = async (refreshToken: string) => {
    // Verify refresh token
    const decoded = verifyToken(refreshToken) as { _id: string; role: string; email: string };

    // Find user by decoded ID
    const user = await User.findById(decoded._id);
    if (!user) throw new AppError(404, "User not found");

    // Generate new access token
    const { accessToken } = generateTokens({
        _id: user._id,
        role: user.role,
        email: user.email,
    });

    return { accessToken };
};

// ========================
// Export auth services
// ========================
export const authServices = {
    createUserIntoDb,
    loginUserIntoDb,
    refreshAccessToken,
};
