import React, { useState, FormEvent } from 'react';
import { createAgent } from '../../services/agent.service';
import { User, UserPlus, Mail, Lock } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the styles

interface AgentFormProps {
  setToast: React.Dispatch<React.SetStateAction<{ message: string; type: 'success' | 'error' } | null>>;
}

const AgentForm: React.FC<AgentFormProps> = ({ setToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState(''); // This will now store the full phone number with country code
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createAgent({ password, name, email, mobile });
      setToast({ message: 'Agent created successfully!', type: 'success' });
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
    } catch {
      setError('Failed to create agent');
      setToast({ message: 'Agent creation Failed!', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-black space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="flex items-center mb-4">
        <UserPlus className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold">Add New Agent</h2>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <div className="relative">
          <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="John Doe"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="relative">
          <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="john.doe@example.com"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Mobile No.</label>
        <div className="relative">
          {/* <Smartphone className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /> */}
          <PhoneInput
            international
            defaultCountry="IN" // Set a default country
            value={mobile}
            onChange={(value) => setMobile(value || '')} // Update the mobile state
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter phone number"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter password"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition-colors flex items-center justify-center"
      >
        <UserPlus className="h-5 w-5 mr-2" />
        Create Agent
      </button>
    </form>
  );
};

export default AgentForm;