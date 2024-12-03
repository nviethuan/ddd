import { Schema } from 'mongoose';

export const emailSchema = new Schema(
  {
    refId: Schema.Types.ObjectId, // user id or account id
    email: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: Date,
    deletedBy: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);

emailSchema.index({ email: 1 }, { unique: true, name: '03_Dec_24_email_unique' });
