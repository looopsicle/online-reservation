import { getAllServices, getServiceById as repoGetServiceById } from "../repository/ServiceRepository.js";
import type { Service } from "../../../shared/models/Service.js";

export const fetchAllServices = async (): Promise<Service[]> => {
  // kalau ada logic lain bisa ditambahkan di sini
  const services = await getAllServices();
  return services;
};

export const getServiceById = async (id: number): Promise<Service | null> => {
  return repoGetServiceById(id);
};
