export interface Service {
    id: number;
    name: string;
    description?: string;
    durationMinutes: number;
    price: number;
    genderPreference?: 'male' | 'female';
    type: 'massage' | 'facial' | 'hair' | 'nails' | 'bodyTreatment';
    createdAt?: Date;
    updatedAt?: Date;
}