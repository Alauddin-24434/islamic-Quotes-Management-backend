import express from "express";
import { authControllers } from "../controllers/auth.controllers";

const router = express.Router();

// Register user
router.post('/register', authControllers.createUser);

// Login user
router.post('/login', authControllers.loginUser);

// Refresh token
router.post('/refresh-token', authControllers.refreshToken);

export const authRoutes = router;
