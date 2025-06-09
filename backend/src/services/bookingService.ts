import { Booking } from '../../../shared/models/Booking.js';
import { BookingRepository } from '../repository/BookingRepository.js';

export class BookingService {
    static async createBooking(data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
        // Business rules, e.g., checking overlapping bookings, can be added here
        const id = await BookingRepository.create(data);
        const booking = await BookingRepository.findById(id);
        if (!booking) throw new Error('Failed to create booking');
        return booking;
    }

    static async getBookingById(id: number): Promise<Booking | null> {
        return BookingRepository.findById(id);
    }

    static async getAllBookings(): Promise<Booking[]> {
        return BookingRepository.findAll();
    }

    static async updateBookingStatus(id: number, status: Booking['status']): Promise<void> {
        return BookingRepository.updateStatus(id, status);
    }

    static async deleteBooking(id: number): Promise<void> {
        return BookingRepository.delete(id);
    }

    static async getBookingsByUser(userId: number): Promise<Booking[]> {
        return BookingRepository.findByUserId(userId);
    }
}
