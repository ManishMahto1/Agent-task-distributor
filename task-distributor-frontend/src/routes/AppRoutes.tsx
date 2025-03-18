import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AgentManagementPage from '../pages/AgentManagementPage';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/agents" element={<AgentManagementPage />} />
        </>
      ) : (
        <Route path="*" element={<LoginPage />} />
      )}
    </Routes>
  );
};

export default AppRoutes;