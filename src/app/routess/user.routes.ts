import express from "express";
import { authControllers } from "../controllers/auth.controllers";
import { userControllers } from "../controllers/user.controllers";
import { upload } from "../utills/cloudinary";
import { authenticate } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorigation";

const router = express.Router();

// =======================
// Update user (only name & avatar)
// =======================
router.patch(
  "/:id/update",
  authenticate,
  authorize("user", "admin"),
 
  upload.single("avatar"),

  userControllers.updateUserById
);

// =======================
// Get all users
// =======================
router.get(
  "/",
  authenticate,
  authorize("admin"), // only admin can get all users
  userControllers.getAllUsers
);

// =======================
// Get user by ID
// =======================
router.get(
  "/:id",
  authenticate,
  authorize("user", "admin"), // user can get their own info, admin can get anyone
  userControllers.getUserById
);

export const userRoutes = router;
