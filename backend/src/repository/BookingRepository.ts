// src/repositories/BookingRepository.ts
import pool from '../config/db.js';
import { Booking } from '../../../shared/models/Booking.js';

export class BookingRepository {
    static async create(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
        const [result]: any = await pool.query(
            `INSERT INTO bookings (customer_id, service_id, booking_date, booking_time, gender_preference, status)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                booking.customerId,
                booking.serviceId,
                booking.bookingDate,
                booking.bookingTime,
                booking.genderPreference || null,
                booking.status
            ]
        );
        return result.insertId;
    }

    static async findById(id: number): Promise<Booking | null> {
        const [rows]: any = await pool.query(
            `SELECT
            id,
            customer_id      AS customerId,
            service_id       AS serviceId,
            booking_date     AS bookingDate,
            booking_time     AS bookingTime,
            gender_preference AS genderPreference,
            status
            FROM bookings
            WHERE id = ?`,
            [id]
        );
        return rows[0] || null;
    }

    static async findByUserId(userId: number): Promise<Booking[]> {
        const [rows]: any = await pool.query(
        `SELECT
            id,
            customer_id      AS userId,
            service_id       AS serviceId,
            booking_date     AS bookingDate,
            booking_time     AS bookingTime,
            gender_preference AS genderPreference,
            status
            FROM bookings
            WHERE customer_id = ?`,
        [userId]
        );
        return rows as Booking[];
    }

    static async findAll(): Promise<Booking[]> {
        const [rows]: any = await pool.query(
            `SELECT
            id,
            customer_id      AS customerId,
            service_id       AS serviceId,
            booking_date     AS bookingDate,
            booking_time     AS bookingTime,
            gender_preference AS genderPreference,
            status
            FROM bookings`
        );
        return rows as Booking[];
    }

    static async updateStatus(id: number, status: Booking['status']): Promise<void> {
        await pool.query(`UPDATE bookings SET status = ? WHERE id = ?`, [status, id]);
    }

    static async delete(id: number): Promise<void> {
        await pool.query(`DELETE FROM bookings WHERE id = ?`, [id]);
    }
}