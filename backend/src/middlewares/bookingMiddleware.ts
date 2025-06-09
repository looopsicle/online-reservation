// src/middlewares/bookingMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const validateBooking = (req: Request, res: Response, next: NextFunction) => {
    const { serviceId, bookingDate, bookingTime, status } = req.body;
    if (!serviceId || !bookingDate || !bookingTime || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    next();
};
