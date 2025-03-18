import axios from 'axios';
import { IAgent } from '../types/agent';

export const createAgent = async (agent: Omit<IAgent, '_id'>): Promise<IAgent> => {
  const response = await axios.post('http://localhost:5000/api/agents', agent, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const getAgents = async (): Promise<IAgent[]> => {
  const response = await axios.get('http://localhost:5000/api/agents', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const updateAgent = async (id: string, agent: Partial<IAgent>): Promise<IAgent> => {
  const response = await axios.put(`http://localhost:5000/api/agents/${id}`, agent, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const deleteAgent = async (id: string): Promise<void> => {
  await axios.delete(`http://localhost:5000/api/agents/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};