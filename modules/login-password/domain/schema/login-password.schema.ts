import { Collection } from '@common/constants/collections';
import { Schema } from 'mongoose';

export const loginPasswordSchema = new Schema(
  {
    refId: {
      type: Schema.Types.ObjectId,
      ref: Collection.USER,
    }, // user id or account id
    password: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

loginPasswordSchema.index({ refId: 1 }, { unique: true, name: '03_Dec_24_refId_unique' });
