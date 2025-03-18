import 'dotenv/config'; // Load environment variables
import express from 'express';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import agentRoutes from './routes/agent.routes';
import taskRoutes from './routes/task.routes';
import { errorMiddleware } from './middleware/error.middleware';
import { env } from './utils/env';
import cors from 'cors';
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data

app.use(express.json());
// Configure CORS to allow requests from the frontend origin
app.use(
  cors({
    origin: 'http://localhost:5173', // Exact origin without trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(errorMiddleware);

// Database connection
connectDB();

// Start the server
const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;