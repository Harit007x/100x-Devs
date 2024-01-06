// models/Todo.ts

import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

interface Task {
  first_name: string;
  last_name: string;
  full_name: string;
  user_name: string;
  password: string;
}

interface UserDocument extends Task, Document {
  generateAuthToken: (expiresIn: number) => string;
}

const userSchema = new Schema<UserDocument>(
  {
    last_name: { type: String, required: true },
    full_name: { type: String, required: true },
    user_name: { type: String, required: true },
    password: {type: String, required: true}
},
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

// custom helper methods
userSchema.methods.generateAuthToken = function (expiresIn: number) {
  const user = {
    _id: this._id,
  }
  
  const token = jwt.sign({user}, process.env.JWT_SECRET || '',{expiresIn: expiresIn,});
  return token;
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;