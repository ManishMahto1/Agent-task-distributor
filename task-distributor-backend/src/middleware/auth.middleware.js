import { verifyToken } from '../utils/jwt.js';
import { CustomError } from '../utils/customError.js';
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        throw new CustomError('Access denied', 401);
    try {
        const decoded = verifyToken(token);
        if (typeof decoded === 'string') {
            throw new CustomError('Invalid token', 401);
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        throw new CustomError('Invalid token', 401);
    }
};
