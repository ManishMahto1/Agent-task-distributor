import express from 'express';
import { getTasks, getTasksByAgent } from '../controllers/task.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../utils/fileUpload.js';
import { uploadTasks } from '../controllers/task.controller.js';
const router = express.Router();
router.post('/upload', upload.single('file'), uploadTasks);
// Get all agents
router.get('/', authMiddleware, getTasks);
router.get('/by-agent', authMiddleware, getTasksByAgent);
export default router;
