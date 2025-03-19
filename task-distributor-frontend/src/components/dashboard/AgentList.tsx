import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setAgents, deleteAgent as deleteAgentAction, updateAgent as updateAgentAction } from '../../store/slices/agentSlice';
import { getAgents, deleteAgent, updateAgent } from '../../services/agent.service';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';
import { IAgent } from '../../types/agent';
import UpdateAgentModal from './UpdateAgentModal';

const AgentList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const agents = useSelector((state: RootState) => state.agents.agents);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<IAgent | null>(null);

  // Fetch agents on component mount
  useEffect(() => {
    const loadAgents = async () => {
      try {
        const agents = await getAgents();
        dispatch(setAgents(agents));
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    loadAgents();
  }, [dispatch]);

  // Handle agent deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteAgent(id);
      dispatch(deleteAgentAction(id));
    } catch (error) {
      console.error('Failed to delete agent:', error);
    }
  };

  // Handle agent edit
  const handleEdit = (agent: IAgent) => {
    setSelectedAgent(agent);
    setModalOpen(true);
  };

  // Handle agent update
  const handleSaveAgent = async (updatedAgent: IAgent) => {
    try {
      const res = await updateAgent(updatedAgent._id, updatedAgent);
      dispatch(updateAgentAction(res)); // Update Redux store
      setModalOpen(false); // Close modal after save
    } catch (err) {
      console.error('Failed to update agent:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <User className="h-8 w-8 text-violet-600 mr-2" />
        <h2 className="text-2xl font-bold text-violet-800">Agent List</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        <AnimatePresence>
          {agents.map((agent, index) => (
            <motion.div
              key={agent._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.05 }}
              className="bg-violet-50 p-4 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-violet-800">{agent.name}</h3>
                  <p className="text-violet-600">{agent.email}</p>
                  <p className="text-violet-500">{agent.mobile}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(agent)}
                    className="text-violet-600 hover:text-violet-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(agent._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Update Agent Modal */}
      <UpdateAgentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        agent={selectedAgent}
        onSave={handleSaveAgent}
      />
    </div>
  );
};

export default AgentList;