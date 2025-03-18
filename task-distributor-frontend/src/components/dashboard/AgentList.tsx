import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setAgents } from '../../store/slices/agentSlice';
import { getAgents } from '../../services/agent.service';
import { deleteAgent } from '../../services/agent.service';
import { motion , AnimatePresence} from 'framer-motion';
import { User } from 'lucide-react';
import { deleteAgent as deleteAgentAction } from '../../store/slices/agentSlice';

const AgentList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const agents = useSelector((state: RootState) => state.agents.agents);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const agents = await getAgents();
        console.log(agents);
        
        dispatch(setAgents(agents));
        
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    loadAgents();
  }, [dispatch]);
  
  const handleDelete = async (id: string) => {
    try {
      await deleteAgent(id);
      dispatch(deleteAgentAction(id));
    } catch (error) {
      console.error('Failed to delete agent:', error);

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
                  <button className="text-violet-600 hover:text-violet-800">
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
    </div>
  );
};

export default AgentList;

