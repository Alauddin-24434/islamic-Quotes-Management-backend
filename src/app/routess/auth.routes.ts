import express from "express";
import { authControllers } from "../controllers/auth.controllers";
import { validateBody } from "../middlewares/validateBody";
import { createUserSchema } from "../validations/user.validations";

const router = express.Router();

// Register user
router.post('/register', validateBody(createUserSchema), authControllers.createUser);

// Login user
router.post('/login', authControllers.loginUser);

// Refresh token
router.post('/refresh-token', authControllers.refreshToken);

export const authRoutes = router;
