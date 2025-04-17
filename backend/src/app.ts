import express from "express";
import cors from "cors";

import getDB from './config/db';
import reservationRoutes from "./routes/reservationRoutes";

async function main()
{
    await getDB();
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/reservations", reservationRoutes);
}

main().catch(console.error)