import { Request, Response } from 'express';
import Agent from '../models/Agent.model';
import { hashPassword } from '../utils/password';
import { CustomError } from '../utils/customError';

// Create a new agent
export const createAgent = async (req: Request, res: Response) => {
  const { name, email, mobile, password } = req.body;


  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) throw new CustomError('Agent already exists', 409);

    const hashedPassword = await hashPassword(password);
    const agent = new Agent({ name, email, mobile, password: hashedPassword });
    await agent.save();

    res.status(201).json({ message: 'Agent created successfully', agent });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// Get all agents
export const getAgents = async (req: Request, res: Response) => {
  try {
    const agents = await Agent.find({}, { password: 0 }); // Exclude password field
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a single agent by ID
export const getAgentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const agent = await Agent.findById(id, { password: 0 }); // Exclude password field
    if (!agent) throw new CustomError('Agent not found', 404);

    res.status(200).json(agent);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// Update an agent by ID
export const updateAgent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, mobile, password } = req.body;

  try {
    const agent = await Agent.findById(id);
    if (!agent) throw new CustomError('Agent not found', 404);

    // Update fields
    if (name) agent.name = name;
    if (email) agent.email = email;
    if (mobile) agent.mobile = mobile;
    if (password) agent.password = await hashPassword(password);

    await agent.save();

    res.status(200).json({ message: 'Agent updated successfully', agent });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// Delete an agent by ID
export const deleteAgent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const agent = await Agent.findByIdAndDelete(id);
    if (!agent) throw new CustomError('Agent not found', 404);

    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};