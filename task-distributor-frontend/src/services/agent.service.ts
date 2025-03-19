import axios from 'axios';
import { IAgent } from '../types/agent';

const BaseURL = 'http://localhost:5000/api/agents';
export const createAgent = async (agent: Omit<IAgent, '_id'>): Promise<IAgent> => {
  const response = await axios.post(BaseURL, agent, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const getAgents = async (): Promise<IAgent[]> => {
  const response = await axios.get(BaseURL, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const updateAgent = async (id: string, agent: Partial<IAgent>): Promise<IAgent> => {
  const response = await axios.put(`${BaseURL}/${id}`, agent, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const deleteAgent = async (id: string): Promise<void> => {
  await axios.delete(`${BaseURL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};