import mongoose from 'mongoose';
const TaskSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    phone: { type: Number, required: true },
    notes: { type: String },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    assignedAt: { type: Date, default: Date.now },
});
export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
