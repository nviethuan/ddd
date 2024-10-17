import { Schema } from 'mongoose';

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

groupSchema.index({ name: 1 }, { unique: true, name: '28_Sept_unique_name' });

export { groupSchema };
