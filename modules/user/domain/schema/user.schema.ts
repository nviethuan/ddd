import { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: String,
    fName: String,
    lName: String,
    locale: String,
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

userSchema.index({ username: 1 }, { unique: true, name: '29_Sept_24_username_unique' });

export { userSchema };
