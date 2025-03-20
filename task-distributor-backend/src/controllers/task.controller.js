import Task from '../models/Task.model.js';
import Agent from '../models/Agent.model.js';
import { distributeTasks } from '../services/taskDistributor.service.js';
import { CustomError } from '../utils/customError.js';
import { parseFile } from '../utils/parseFile.js'; // updated import
import TaskModel from '../models/Task.model.js';
import fs from 'fs';
export const uploadTasks = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        const tasks = await parseFile(req.file.path);
        fs.unlinkSync(req.file.path); // Clean up temp file
        const agents = await Agent.find({});
        const distributedTasks = distributeTasks(tasks, agents);
        await TaskModel.insertMany(distributedTasks);
        res.status(200).json({ message: 'Tasks uploaded and distributed' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Get all agents
export const getTasks = async (req, res) => {
    try {
        const agents = await Task.find({}, { password: 0 }); // Exclude password field
        console.log(getTasks);
        res.status(200).json(agents);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const getTasksByAgent = async (req, res) => {
    try {
        const tasks = await Task.find().populate('agent', 'name email'); // Populate agent details
        const tasksByAgent = tasks.reduce((acc, task) => {
            const agentId = task.agent._id.toString();
            if (!acc[agentId]) {
                acc[agentId] = {
                    agent: task.agent,
                    tasks: [],
                };
            }
            acc[agentId].tasks.push(task);
            return acc;
        }, {});
        res.status(200).json(Object.values(tasksByAgent));
    }
    catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
