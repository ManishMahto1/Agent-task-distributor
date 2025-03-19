import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { IAgent } from '../../types/agent';

interface UpdateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: IAgent | null;
  onSave: (updatedAgent: IAgent) => void;
}

const UpdateAgentModal: React.FC<UpdateAgentModalProps> = ({ isOpen, onClose, agent, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  // Update form fields when agent changes
  useEffect(() => {
    if (agent) {
      setName(agent.name);
      setEmail(agent.email);
      setMobile(agent.mobile);
    }
  }, [agent]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agent) return;

    const updatedAgent = {
      ...agent,
      name,
      email,
      mobile,
    };

    onSave(updatedAgent); // Pass updated agent to parent
  };

  if (!agent) return null; // Don't render modal if no agent is selected

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        >
          <Dialog.Title className="text-lg font-semibold text-violet-800 mb-4">
            Update Agent
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
            <div>
              <label className="block text-sm font-medium text-violet-700">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-violet-700">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full p-2 border  rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-violet-700">Mobile</label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-700"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UpdateAgentModal;