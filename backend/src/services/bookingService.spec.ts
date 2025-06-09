import { BookingService } from './bookingService';
import { BookingRepository } from '../repository/BookingRepository';

jest.mock('../repository/BookingRepository');

describe('BookingService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getBookingsByUser should call repository.findByUserId', async () => {
    // Arrange
    const fake = [{ id: 5, customerId: 1 } as any];
    (BookingRepository.findByUserId as jest.Mock).mockResolvedValue(fake);

    // Act
    const result = await BookingService.getBookingsByUser(1);

    // Assert
    expect(BookingRepository.findByUserId).toHaveBeenCalledWith(1);
    expect(result).toBe(fake);
  });

  it('getBookingById should return null if not found', async () => {
    (BookingRepository.findById as jest.Mock).mockResolvedValue(null);
    const result = await BookingService.getBookingById(99);
    expect(BookingRepository.findById).toHaveBeenCalledWith(99);
    expect(result).toBeNull();
  });

  it('createBooking should throw if repository.create fails', async () => {
    (BookingRepository.create as jest.Mock).mockResolvedValue(10);
    (BookingRepository.findById as jest.Mock).mockResolvedValue(null);
    await expect(
      BookingService.createBooking({
        customerId:1, serviceId:2, bookingDate:'2025-06-01',
        bookingTime:'10:00:00', genderPreference:'female', status:'pending'
      } as any)
    ).rejects.toThrow('Failed to create booking');
  });
});
