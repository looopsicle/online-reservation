import pool from '../config/db.js';
import { User } from "../../../shared/models/User.js";

export async function findUserByEmail(email: string): Promise<User | null> {
  const [rows]: any = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  console.log('Query result for email:', email, rows);
  if (rows.length === 0) return null;
  return rows[0];
}

export async function createUser(user: Partial<User>): Promise<User> {
  const [result]: any = await pool.execute(
    'INSERT INTO users (email, name, password, role) VALUES (?, ?, ?, ?)',
    [user.email, user.name, user.password, user.role]
  );
  const insertedId = result.insertId;
  return { id: insertedId, ...user } as User;
}

export async function findUserById(id: number): Promise<User | null> {
  const [rows]: any = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  if (rows.length === 0) return null;
  return rows[0] as User;
}