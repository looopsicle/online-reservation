import pool from '../config/db.js';
import type { Service } from "../../../shared/models/Service.js";


export const getAllServices = async (): Promise<Service[]> => {
  const [rows] = await pool.query(
    "SELECT id, name, description, photo, duration_minutes, price, type, created_at, updated_at FROM services"
  );

  // mysql2 punya tipe any di rows, kita casting saja ke Service[]
  return rows as Service[];
};

export const getServiceById = async (id: number): Promise<Service | null> => {
  const [rows] = await pool.query(
    "SELECT id, name, description, photo, duration_minutes, price, type, created_at, updated_at FROM services WHERE id = ? LIMIT 1",
    [id]
  );
  const results = rows as Service[];
  return results.length > 0 ? results[0] : null;
};