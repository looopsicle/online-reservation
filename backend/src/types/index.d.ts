import * as express from 'express';
import { User } from '@shared/models/User';

declare global {
  namespace Express {
    export interface Request {
      user?: { id: number; role: string };
    }
  }
}
