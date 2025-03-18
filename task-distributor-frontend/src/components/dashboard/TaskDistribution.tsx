import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTasksByAgent } from '../../services/task.service';
import { ListChecks, Phone, StickyNote, Calendar, User, AlertCircle, Loader } from 'lucide-react';

interface Task {
  _id: string;
  firstName: string;
  phone: number;
  notes?: string;
  assignedAt: string;
}

interface AgentTasks {
  agent: {
    _id: string;
    name: string;
    email: string;
  };
  tasks: Task[];
}

const TaskDistribution: React.FC = () => {
  const [agentTasks, setAgentTasks] = useState<AgentTasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksByAgent();
        setAgentTasks(data);
      } catch  {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl  p-6"
    >
      <div className="flex items-center mb-6">
        <ListChecks className="h-8 w-8 text-purple-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Task Distribution</h2>
      </div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center py-8"
        >
          <Loader className="h-8 w-8 text-purple-600 animate-spin" />
        </motion.div>
      ) : error ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-red-50 p-4 rounded-xl flex items-center"
        >
          <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
          <p className="text-red-600 font-medium">{error}</p>
        </motion.div>
      ) : agentTasks.length === 0 ? (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-center py-6"
        >
          No tasks distributed yet. Upload a CSV to get started!
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {agentTasks.map(({ agent, tasks }) => (
              <motion.div
                key={agent._id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-purple-600 text-white p-3 rounded-xl mr-3">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{agent.name}</h3>
                    <p className="text-sm text-purple-600">{agent.email}</p>
                  </div>
                </div>

                <div className="space-y-3 w-60 flex flex-col justify-between">
                  <AnimatePresence>
                    {tasks.map((task) => (
                      <motion.div
                        key={task._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">
                            {task.firstName}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-4 w-4 mr-1" />
                            {task.phone}
                          </div>
                        </div>

                        {task.notes && (
                          <div className="flex items-start text-sm text-gray-600 mt-2">
                            <StickyNote className="h-4 w-4 mt-1 mr-2 text-purple-600" />
                            <p>{task.notes}</p>
                          </div>
                        )}

                        <div className="flex items-center text-xs text-gray-400 mt-3">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(task.assignedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default TaskDistribution;