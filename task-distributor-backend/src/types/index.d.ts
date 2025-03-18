import { Document } from 'mongoose';

export interface Admin extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

export interface Agent extends Document {
  name: string;
  email: string;
  mobile: string;
  password: string;
  createdAt: Date;
}

export interface Task {
  _id:string;
  firstName: string;
  notes?: string;
  admin: string;
  phone: string | Number;
  _id: unknown;
  assignedAt: Date;
  $locals: Record<string, unknown>;
  $op: "save" | "validate" | "remove" | null;
  schema: Schema;
  $assertPopulated?: any;
  $clearModifiedPaths?: any;
  $clone?: any;
  $createModifiedPathsSnapshot?: any;
  // Add other missing properties here
}