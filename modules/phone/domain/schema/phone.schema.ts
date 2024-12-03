import { Schema } from 'mongoose';

export const phoneSchema = new Schema(
  {
    refId: Schema.Types.ObjectId, // user id or account id
    number: String,
    countryCode: String,
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

phoneSchema.index({ number: 1 }, { unique: true, name: '03_Dec_24_number_unique' });
