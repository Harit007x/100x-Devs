// models/Todo.ts

import mongoose, { Document, Schema } from 'mongoose';

interface Task {
  user_id: mongoose.Types.ObjectId;
  task_name: string;
  description: string;
  badge_text: string;
  badge_color: string;
  category_id: mongoose.Types.ObjectId; // Foreign key reference
}

interface TaskDocument extends Task, Document {}

const taskSchema = new Schema<TaskDocument>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    task_name: { type: String, required: true },
    description: { type: String, required: true },
    badge_text: { type: String, required: true },
    badge_color: { type: String, required: true },
    category_id: {type: Schema.Types.ObjectId, ref: 'Category', required: true}, //Foreign key reference
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

const TaskModel = mongoose.model<TaskDocument>('Todo', taskSchema);

export default TaskModel;
