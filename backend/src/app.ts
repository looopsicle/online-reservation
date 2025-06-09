import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from 'path';
import cookieParser from 'cookie-parser';
dotenv.config();

import { fileURLToPath } from 'url';
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import bookingRoutes from './routes/bookingRoutes.js';
import { errorHandler } from "./middlewares/errorHandler.js";

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, 
};

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(errorHandler);

export default app;
