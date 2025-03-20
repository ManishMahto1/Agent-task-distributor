import { CustomError } from '../utils/customError.js';
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        throw new CustomError('Validation failed', 400);
    }
};
