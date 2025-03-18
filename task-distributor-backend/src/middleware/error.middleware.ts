import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({ message: err.message });
};