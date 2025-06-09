import { Router } from "express";
import { login, register, getCurrentUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get("/me", authMiddleware, getCurrentUser);

export default router;