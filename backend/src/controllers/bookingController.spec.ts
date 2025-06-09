// src/controllers/bookingController.spec.ts
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import bookingRoutes from '../routes/bookingRoutes';
import * as bookingController from './bookingController';
import { authMiddleware } from '../middlewares/authMiddleware';

// Mock authMiddleware agar selalu lanjut
jest.mock('../middlewares/authMiddleware', () => ({
  authMiddleware: (_req: Request, _res: Response, next: NextFunction) => next(),
}));

describe('BookingController routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/bookings', bookingRoutes);

  it('GET /api/bookings/user/:userId should call getBookingsByUser', async () => {
    const mockData = [{ id: 1 }];

    jest.spyOn(bookingController, 'getBookingsByUser')
      .mockImplementation((
        (req: Request, res: Response, next: NextFunction) => {
          res.json(mockData);
        }
      ) as any);

    const res = await request(app)
      .get('/api/bookings/user/1')
      .set('Authorization', 'Bearer faketoken');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
    expect(bookingController.getBookingsByUser).toHaveBeenCalled();
  });

  it('DELETE /api/bookings/:id should call deleteBooking', async () => {
    jest.spyOn(bookingController, 'deleteBooking')
      .mockImplementation((
        (req: Request, res: Response, next: NextFunction) => {
          res.status(204).send();
        }
      ) as any);

    const res = await request(app)
      .delete('/api/bookings/5')
      .set('Authorization', 'Bearer faketoken');

    expect(res.status).toBe(204);
    expect(bookingController.deleteBooking).toHaveBeenCalled();
  });
});
