import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

// =============================================================
// IUser interface
// =============================================================
export interface IUser extends Document {
  name: string;
  avatar?: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
  
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// =============================================================
// User Schema
// =============================================================
const userSchema = new Schema<IUser>(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"], // Custom error message
    },
    avatar: { 
      type: String, // Optional profile picture URL
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true, 
      lowercase: true 
    },
    password: { 
      type: String, 
      required: [true, "Password is required"], 
      minlength: [6, "Password must be at least 6 characters"]
    },
    role: { 
      type: String,
      enum: ["user", "admin"], 
      default: "user"
    }
  },
  {
    timestamps: true,   
    versionKey: false,  
  }
);

// =============================================================
// Pre-save middleware: hash password before saving
// =============================================================
userSchema.pre("save", async function(next) {
  const user = this as IUser;

  // Only hash password if it is new or modified
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hash = await bcrypt.hash(user.password, salt); // Hash password
    user.password = hash; // Replace plain password with hashed
    next();
  } catch (error) {
    next(error as any);
  }
});

// =============================================================
// Method to compare passwords during login
// =============================================================
userSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// =============================================================
// Export User model
// =============================================================
export const User = model<IUser>("User", userSchema);
