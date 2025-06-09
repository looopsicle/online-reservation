import { Request, Response, NextFunction } from "express";
import * as serviceService from "../services/serviceService.js";

export const getServicesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await serviceService.fetchAllServices();
    res.json(services);
  } catch (error) {
    next(error);
  }
};

export const getServiceDetail = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID service tidak valid" });
  }

  try {
    const service = await serviceService.getServiceById(id);
    if (!service) {
      return res.status(404).json({ message: "Service tidak ditemukan" });
    }
    res.json(service);
  } catch (error) {
    console.error("Error getServiceDetail:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
