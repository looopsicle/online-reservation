export interface UserMinimal {
  id: number;
  email: string;
  name: string;
  phone: string;
  gender: 'male' | 'female';
  role: 'admin' | 'customer';
}