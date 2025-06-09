import { User } from "../../../shared/models/User.js";
import { findUserByEmail, createUser, findUserById } from "../repository/UserRepository.js";

// import hashUtils from "../../../shared/utils/hash.js";
// const { hashPassword, comparePassword } = hashUtils;

export async function register(data: { email: string; password: string; name: string }): Promise<User> {
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) throw new Error('User already exists');

  // Simpan password plain text langsung ke database
  const newUser = await createUser({ ...data, role: 'customer' });
  return newUser;
}

export async function login(email: string, password: string): Promise<User> {
  console.log('Login attempt:', email);

  const user = await findUserByEmail(email);
  if (!user) {
    console.log('User not found for email:', email);
    throw new Error('Invalid credentials');
  }

  // Bandingkan password plain text
  if (password !== user.password) {
    console.log('Password mismatch for user:', email);
    throw new Error('Invalid credentials');
  }

  console.log('Login successful for user:', user.email);
  return user;
}

export async function getUserById(id: number): Promise<User | null> {
  return await findUserById(id);
}