// models/Category.ts

import mongoose, { Document, Schema, Types } from 'mongoose';

interface Category {
  user_id: mongoose.Types.ObjectId;
  title: string;
}

export interface CategoryDocument extends Category, Document {}

const categorySchema = new Schema<CategoryDocument>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, maxlength: 14 },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

const CategoryModel = mongoose.model<CategoryDocument>('Category', categorySchema);

export default CategoryModel;
