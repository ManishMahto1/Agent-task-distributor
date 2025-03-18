import { Request, Response } from 'express';
import Admin from '../models/Admin.model';
import { comparePassword, hashPassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { CustomError } from '../utils/customError';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  

  try {
    const admin = await Admin.findOne({email});
    
    if (!admin) throw new CustomError('Invalid credentials', 401);

 /*    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) throw new CustomError('Invalid credentials', 401);
 */
    const token = generateToken({ id: admin._id, role: 'admin' });
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};