import axios from 'axios';
import { IAuthResponse } from '../types/auth';


export const login = async (email: string, password: string): Promise<IAuthResponse> => {
  const response = await axios.post('https://agent-task-distributor.onrender.com/api/auth/login', { email, password });
  return response.data;
};