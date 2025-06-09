export type UserRole = 'admin' | 'customer';

export interface User {
    id: number;
    email: string;
    name: string;
    password?: string;
    gender?: 'male' | 'female'; // opsional, kalau admin tidak perlu gender misal
    phone?: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}

