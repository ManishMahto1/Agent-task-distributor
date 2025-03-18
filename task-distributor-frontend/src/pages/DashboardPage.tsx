// DashboardPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard,PlusCircle,List, UploadCloud, ListChecks, Menu, ChevronLeft, Users } from 'lucide-react';
import AgentForm from '../components/dashboard/AgentForm';
import FileUpload from '../components/dashboard/FileUpload';
import AgentList from '../components/dashboard/AgentList';
import TaskDistribution from '../components/dashboard/TaskDistribution';
import AgentManagementPage from './AgentManagementPage';
import Toast from '../components/shared/Toast';

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [activeView, setActiveView] = useState('Dashboard');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const sidebarItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Add Agents', icon: <PlusCircle className="h-5 w-5" /> },
    { name: 'Agents', icon: <Users className="h-5 w-5" /> },
    { name: 'Tasks', icon: <ListChecks className="h-5 w-5" /> },
    { name: 'Distributed Lists', icon: <List className="h-5 w-5" /> },

  ];

  const sidebarVariants = {
    open: { width: 256, x: 0 },
    closed: { width: 80, x: 0 }
  };

  const contentVariants = {
    open: { marginLeft: 0 },
    closed: { marginLeft: 0 }
  };

  return (
    <div className="min-h-screen bg-violet-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="bg-white shadow-xl z-50 fixed lg:relative"
      >
        <div className="p-4 border-b border-violet-100">
          <div className="flex items-center justify-between">
            {isSidebarOpen ? (
              <>
                <h2 className="text-xl font-bold text-violet-700">Admin Panel</h2>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-violet-500 hover:text-violet-700"
                >
                  <ChevronLeft className={`h-6 w-6 transition-transform ${!isSidebarOpen && 'rotate-180'}`} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg bg-violet-600 text-white"
              >
                <Menu size={20} />
              </button>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView(item.name)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                activeView === item.name
                  ? 'bg-violet-100 text-violet-700'
                  : 'text-violet-600 hover:bg-violet-50'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="ml-2">{item.name}</span>}
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <motion.div
        initial={false}
        animate={isSidebarOpen ? "open" : "closed"}
        variants={contentVariants}
        className="flex-1 transition-all duration-300"
      >
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="lg:hidden text-violet-600 mr-4"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold text-violet-800">Admin Dashboard</h1>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
               {activeView === 'Dashboard' && (
                <div className="bg-white rounded-2xl shadow-xl p-6">           
                    <AgentManagementPage  />

                </div>
              )}
              {activeView === 'Tasks' && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center mb-6">
                    <UploadCloud className="h-8 w-8 text-violet-600 mr-2" />
                    <h2 className="text-2xl font-bold text-violet-800">Upload Tasks</h2>
                  </div>
                  <FileUpload setToast={setToast} />
                </div>
              )}
             {activeView === 'Add Agents' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <AgentForm setToast={setToast}/>
                  </div>
                  
                </div>
              )}    
              {activeView === 'Agents' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <AgentList />
                  </div>
                </div>
              )}

              {activeView === 'Distributed Lists' && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <TaskDistribution />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;