// models/Category.ts

import mongoose, { Document, Schema } from 'mongoose';

interface Category {
  user_id: number;
  title: string;
}

export interface CategoryDocument extends Category, Document {}

const categorySchema = new Schema<CategoryDocument>(
  {
    user_id: { type: Number, required: true },
    title: { type: String, required: true, maxlength: 14 },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

const CategoryModel = mongoose.model<CategoryDocument>('Category', categorySchema);

export default CategoryModel;
