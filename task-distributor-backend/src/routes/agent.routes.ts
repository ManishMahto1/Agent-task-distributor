import express from 'express';
import { createAgent,getAgents,getAgentById ,updateAgent,deleteAgent} from '../controllers/agent.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, createAgent);

// Get all agents
router.get('/', authMiddleware, getAgents);

// Get a single agent by ID
router.get('/:id', authMiddleware, getAgentById);

// Update an agent by ID
router.put('/:id', authMiddleware, updateAgent);

// Delete an agent by ID
router.delete('/:id', authMiddleware, deleteAgent);

export default router;
