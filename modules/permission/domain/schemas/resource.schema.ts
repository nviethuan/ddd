import { Schema } from 'mongoose';

export const resourceSchema = new Schema({
  name: String,
  label: String,
  description: String,
});

resourceSchema.index({ name: 1 }, { unique: true });
