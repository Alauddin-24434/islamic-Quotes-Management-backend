import { AppError } from "../error/appError";
import { IUser } from "../interfaces/user.interfcae";
import { User } from "../models/user.model";
import { generateTokens } from "../utills/tokensGenerate";


// =============================================================
// Get all users (without password)
// =============================================================
const getAllUsersFromDb = async () => {
  const users = await User.find().select("-password"); // hide password
  if (!users || users.length === 0) {
    throw new AppError(404, "No users found");
  }
  return users;
};
// ==============================================================================
// Get user by ID
// ==============================================================================
const getUserByIdFromDb = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};


//=======================================================================
// update user by userId (only name & avatar)
//========================================================================
const updateUserByIdIntoDb = async (userId: string, payload: Partial<IUser>) => {
  // filter only name and avatar
  const updatePayload: Partial<IUser> = {};
  if (payload.name) updatePayload.name = payload.name;
  if (payload.avatar) updatePayload.avatar = payload.avatar;

  if (Object.keys(updatePayload).length === 0) {
    throw new AppError(400, "Nothing to update. Only 'name' and 'avatar' allowed.");
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updatePayload, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new AppError(404, "User not found");
  }

  // Generate new tokens (optional, if needed)
  const { accessToken, refreshToken } = generateTokens({
    _id: updatedUser._id,
    role: updatedUser.role,
    email: updatedUser.email,
  });

  const safeUser = updatedUser.toObject() as Partial<IUser>;
  delete safeUser.password; // hide password

  return { safeUser, accessToken, refreshToken };
};

// =======================================
// export user services
//==========================================
export const userServices = {
  updateUserByIdIntoDb,
  getAllUsersFromDb,
  getUserByIdFromDb
 
};
