export type UserRole = 'admin' | 'customer';

export interface Customer {
    id: number;
    email: string;
    password?: string;
    name: string;
    gender: 'male' | 'female';
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
}