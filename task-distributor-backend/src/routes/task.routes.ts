import express from 'express';
import { getTasks,getTasksByAgent} from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { upload } from '../utils/fileUpload';
import { uploadTasks } from '../controllers/task.controller';
const router = express.Router();
router.post('/upload', upload.single('file'), uploadTasks);

// Get all agents
router.get('/', authMiddleware, getTasks);

router.get('/by-agent', authMiddleware, getTasksByAgent);
export default router;