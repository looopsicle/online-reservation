import type { Service } from "../models/Service.js";

export function parseService(row: any): Service {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    photo: typeof row.photos === "string" ? JSON.parse(row.photos) : row.photos,
    duration_minutes: row.durationMinutes,
    price: row.price,
    type: row.type,
    created_at: row.createdAt,
    updated_at: row.updatedAt,
  };
}