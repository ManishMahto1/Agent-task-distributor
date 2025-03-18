import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import agentReducer from './slices/agentSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    agents: agentReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;