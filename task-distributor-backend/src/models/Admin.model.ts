import mongoose from 'mongoose';


export interface IAdmin extends Document {
  email: string;
  password: string;
  createdAt: Date;
}


const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);