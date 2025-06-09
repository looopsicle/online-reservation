export interface Service {
    id: number;
    name: string;
    description?: string;
    photo: string;
    duration_minutes: number;
    price: number;
    type: 'massage' | 'facial' | 'hair' | 'nails';
    created_at?: Date;
    updated_at?: Date;
}