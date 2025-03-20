import mongoose from 'mongoose';
// Define the schema
const AgentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
// Create and export the model
export default mongoose.models.Agent || mongoose.model('Agent', AgentSchema);
