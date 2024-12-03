import { Schema } from 'mongoose';

export const accountSchema = new Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    provider: String,
    uid: String,
    fName: String,
    lName: String,
    deletedAt: Date,
    deletedBy: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);

accountSchema.index({ provider: 1, uid: 1 }, { unique: true, name: '03_Dec_24_provider_uid_unique' });
accountSchema.index({ fName: 1, lName: 1 }, { name: '03_Dec_24_fName_lName_index' });
