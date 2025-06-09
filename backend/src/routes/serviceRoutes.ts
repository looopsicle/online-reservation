import { Router } from "express";
import { getServicesHandler, getServiceDetail } from "../controllers/serviceController.js";

const router = Router();

router.get("/", getServicesHandler);
router.get("/:id", getServiceDetail);

export default router;
