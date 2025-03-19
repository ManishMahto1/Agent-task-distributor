import axios from 'axios';
import { ITask } from '../types/task';
const BaseURL = 'http://localhost:5000/';

export const uploadTasks = async (file: File): Promise<ITask[]> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${BaseURL}api/tasks/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const getTasks = async (): Promise<ITask[]> => {
  const response = await axios.get(`${BaseURL}/api/tasks`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};


export const getTasksByAgent = async () => {
  const response = await axios.get(`${BaseURL}api/tasks/by-agent`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};