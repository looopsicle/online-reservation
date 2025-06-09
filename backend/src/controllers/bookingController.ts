// src/controllers/bookingController.ts
import { Request, Response, NextFunction } from 'express';
import { BookingRepository } from "../repository/BookingRepository.js"; // atau sesuai path-mu
import { BookingService } from '../services/bookingService.js';

export async function createBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as any).user;

    if (!user?.id) return res.status(401).json({ message: 'Unauthorized' });

    // Ambil booking data dari body (tanpa customerId, karena sudah dari JWT)
    const {
      serviceId,
      bookingDate,
      bookingTime,
      genderPreference,
      status = "pending", // default
    } = req.body;
    // Validasi sederhana (bisa dibuat lebih lengkap dengan middleware)
    if (!serviceId || !bookingDate || !bookingTime) {
      return res.status(400).json({ message: 'serviceId, bookingDate, and bookingTime are required.' });
    }

    // Simpan ke database
    const insertId = await BookingRepository.create({
      customerId: user.id, // <= ini ambil dari JWT, BUKAN dari frontend!
      serviceId,
      bookingDate,
      bookingTime,
      genderPreference,
      status,
    });

    const booking = await BookingRepository.findById(insertId);
    res.status(201).json({ message: 'Booking created', booking });

  } catch (err) {
    console.error("Booking creation failed:", err);
    res.status(500).json({ message: 'Internal server error', error: (err as Error).message });
  }
}

export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user?.id) return res.status(401).json({ message: 'Unauthorized' });
        const booking = await BookingService.getBookingById(Number(req.params.id));
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (booking.customerId !== user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }
        res.json(booking);
    } catch (err) {
        next(err);
    }
};

export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user?.id) return res.status(401).json({ message: 'Unauthorized' });
        const bookings = await BookingService.getAllBookings();
        res.json(bookings);
    } catch (err) {
        next(err);
    }
};

export const updateBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user?.id) return res.status(401).json({ message: 'Unauthorized' });

        const bookingId = Number(req.params.id);
        const booking = await BookingService.getBookingById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Authorization: hanya owner yang boleh update
        if (booking.customerId !== user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // Optional: Validasi status baru (misal: hanya "pending", "confirmed", "cancelled")
        const allowedStatuses = ["pending", "confirmed", "cancelled"];
        if (!allowedStatuses.includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        await BookingService.updateBookingStatus(bookingId, req.body.status);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user?.id) return res.status(401).json({ message: 'Unauthorized' });

        const bookingId = Number(req.params.id);
        const booking = await BookingService.getBookingById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Authorization: hanya owner yang boleh delete
        if (booking.customerId !== user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await BookingService.deleteBooking(bookingId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

export const getBookingsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        const userIdParam = Number(req.params.userId);

        // Pastikan user hanya bisa lihat booking-nya sendiri
        if (user.id !== userIdParam) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const bookings = await BookingService.getBookingsByUser(userIdParam);
        res.json(bookings);
    } catch (err) {
        next(err);
    }
};