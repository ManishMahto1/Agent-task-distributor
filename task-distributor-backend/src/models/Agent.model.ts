import mongoose, { Document } from 'mongoose';

// Define the interface for the Agent document
export interface IAgent extends Document {
  _id: string | number;
  name: string;
  email: string;
  mobile: string;
  password: string;
  createdAt: Date;
}

// Define the schema
const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the model
export default mongoose.models.Agent || mongoose.model<IAgent>('Agent', AgentSchema);