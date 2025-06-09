import { Request, Response } from "express";
import * as authService from "../services/userService.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

export async function register(req: Request, res: Response) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: 'User registered', user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    console.log('Login attempt with:', req.body.email);

    const user = await authService.login(req.body.email, req.body.password);

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // Kirim token di HttpOnly cookie (lebih aman)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // hanya HTTPS kalau produksi
      sameSite: 'strict',
      maxAge: 3600000, // 1 jam dalam ms
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    res.json({ message: 'Login success', user: safeUser, token });
  } catch (err: any) {
    console.log('Login failed:', err.message);
    res.status(401).json({ error: err.message });
  }
}

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  // req.user diset oleh authMiddleware
  const jwtUser = req.user;
  if (!jwtUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const user = await authService.getUserById(jwtUser.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Jangan kirim password
  const { password, ...safeUser } = user;
  res.json(safeUser);
}
