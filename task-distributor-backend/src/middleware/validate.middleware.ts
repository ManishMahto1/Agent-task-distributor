import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { CustomError } from '../utils/customError';

export const validate = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    throw new CustomError('Validation failed', 400);
  }
};