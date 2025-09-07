import { AppError } from "../error/appError";
import { Ilogin, IUser } from "../interfaces/user.interfcae";
import { User } from "../models/user.model";

// =============================================================
// Create a new user in the database
// =============================================================
const createUserIntoDb = async (payload: IUser) => {
    // Check if user already exists
    const isExistUser = await User.findOne({ email: payload.email });
    if (isExistUser) {
        throw new AppError(400, "User already exists");
    }

    // Create new user
    const newUser = await User.create(payload);
    return newUser;
}

// =============================================================
// Login user: check email & password
// =============================================================
const loginUserIntoDb = async (payload: Ilogin) => {
    // Find user by email
    const existUser = await User.findOne({ email: payload.email });
    if (!existUser) {
        throw new AppError(404, "User not found");
    }

    // Compare password using Mongoose instance method
    const isPasswordValid = await existUser.comparePassword(payload.password);
    if (!isPasswordValid) {
        throw new AppError(401, "Invalid credentials");
    }

    return existUser;
}

// =============================================================
// Export auth service
// =============================================================
export const authServices = {
    createUserIntoDb,
    loginUserIntoDb
}
