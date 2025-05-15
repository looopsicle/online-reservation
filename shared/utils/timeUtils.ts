export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]; // Format "YYYY-MM-DD"
}

export function formatTime(date: Date): string {
  return date.toTimeString().slice(0, 5); // Format "HH:mm"
}

export function isTimeSlotAvailable(
  existingBookings: { bookingTime: string; bookingDate: string }[],
  requestedDate: string,
  requestedTime: string
): boolean {
  return !existingBookings.some(
    (b) => b.bookingDate === requestedDate && b.bookingTime === requestedTime
  );
}
