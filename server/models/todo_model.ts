// models/Todo.ts

import mongoose, { Document, Schema } from 'mongoose';

interface Todo {
  title: string;
  completed: boolean;
  description: string;
}

interface TodoDocument extends Todo, Document {}

const todoSchema = new Schema<TodoDocument>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    description: { type: String, required: true },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

const TodoModel = mongoose.model<TodoDocument>('Todo', todoSchema);

export default TodoModel;
