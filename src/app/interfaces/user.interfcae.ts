// src/interfaces/interface.ts
import { Document } from "mongoose";

// =============================================================
// IUser interface
// =============================================================
// Represents a User document in MongoDB
export interface IUser extends Document {
  name: string;
  avatar: string;       // Optional profile picture URL
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;

  // Method to compare password during login
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// =============================================================
// Ilogin interface
// =============================================================
// Represents login payload from frontend
export interface Ilogin {
  email: string;
  password: string;
}
