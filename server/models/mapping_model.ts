// models/Todo.ts

import mongoose, { Document, Schema } from 'mongoose';

const mappingSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  mapping: [
    {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      taskItems: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
});

const MappingModel = mongoose.model('Mapping', mappingSchema);

export default MappingModel;
