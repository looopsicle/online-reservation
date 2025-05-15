export interface Booking {
    id: number;
    customerId: number;
    serviceId: number;
    bookingDate: string;
    bookingTime: string;
    genderPreference?: 'male' | 'female';
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt?: Date;
    updatedAt?: Date;
}