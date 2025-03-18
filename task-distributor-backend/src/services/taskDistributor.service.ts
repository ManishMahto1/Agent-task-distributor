import { Task } from '../types';
import Agent from '../models/Agent.model';

export const distributeTasks = (tasks: Task[], agents: Task[]) => {
  if (agents.length === 0) {
    throw new Error('No agents available for task distribution');
  }

  const distribution: Array<Task & { agent: string }> = [];
  const agentCount = agents.length;
  let agentIndex = 0;

  tasks.forEach((task) => {
    const agentId = agents[agentIndex]._id.toString();
    
    distribution.push({
      ...task,
      agent: agentId,
      phone: Number(task.phone), // Ensure phone is stored as number
      assignedAt: new Date()
    });

    agentIndex = (agentIndex + 1) % agentCount;
  });

  return distribution;
};















/* import { IAgent } from '../models/Agent.model'; // Import the interface
import { Task } from '../types';

export const distributeTasks = (tasks: Task[], agents: IAgent[]) => {
  const agentCount = agents.length;
  const distribution: Record<string, Task[]> = {};

  // Initialize distribution for each agent
  agents.forEach((agent) => {
    distribution[agent._id.toString()] = []; // Convert ObjectId to string
  });

  // Distribute tasks among agents
  tasks.forEach((task, index) => {
    const agentIndex = index % agentCount;
    const agentId = agents[agentIndex]._id.toString(); // Convert ObjectId to string
    distribution[agentId].push(task);
  });

  // Flatten the distributed tasks into a single array
  return Object.values(distribution).flat();
}; */