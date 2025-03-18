import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAgent } from '../../types/agent';

interface AgentState {
  agents: IAgent[];
}

const initialState: AgentState = {
  agents: [],
};

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<IAgent[]>) => {
      state.agents = action.payload;
    },
    addAgent: (state, action: PayloadAction<IAgent>) => {
      state.agents.push(action.payload);
    },
    updateAgent: (state, action: PayloadAction<IAgent>) => {
      const index = state.agents.findIndex(agent => agent._id === action.payload._id);
      if (index !== -1) {
        state.agents[index] = action.payload;
      }
    },
    deleteAgent: (state, action: PayloadAction<string>) => {
      state.agents = state.agents.filter(agent => agent._id !== action.payload);
    },
  },
});

export const { setAgents, addAgent, updateAgent, deleteAgent } = agentSlice.actions;
export default agentSlice.reducer;