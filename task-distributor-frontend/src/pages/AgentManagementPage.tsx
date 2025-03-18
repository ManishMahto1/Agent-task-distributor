import React from 'react';
import AgentList from '../components/dashboard/AgentList';
import { Users } from 'lucide-react';

const AgentManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <Users className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
          </div>
          
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-violet-500">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Agents</p>
                <p className="text-2xl font-bold mt-1">24</p>
              </div>
              <Users className="h-8 w-8 text-green-500 bg-green-100 p-1.5 rounded-full" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Today</p>
                <p className="text-2xl font-bold mt-1">18</p>
              </div>
              <Users className="h-8 w-8 text-blue-500 bg-blue-100 p-1.5 rounded-full" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Slots</p>
                <p className="text-2xl font-bold mt-1">6</p>
              </div>
              <Users className="h-8 w-8 text-purple-500 bg-purple-100 p-1.5 rounded-full" />
            </div>
          </div>
        </div>


        {/* Agent List Component */}
        <div className="bg-white  overflow-hidden">
          <AgentList />
        </div>

       
      </div>
    </div>
  );
};

export default AgentManagementPage;