// src/routes/bookingRoutes.ts
import { Router } from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { validateBooking } from '../middlewares/bookingMiddleware.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/', authMiddleware, validateBooking, bookingController.createBooking);
router.get('/', authMiddleware, bookingController.getAllBookings);
router.get('/:id', authMiddleware, bookingController.getBookingById);
router.patch('/:id/status', authMiddleware, bookingController.updateBookingStatus);
router.delete('/:id', authMiddleware, bookingController.deleteBooking);
router.get('/user/:userId', authMiddleware, bookingController.getBookingsByUser);

export default router;
