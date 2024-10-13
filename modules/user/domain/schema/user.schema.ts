import { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: String,
    password: String,
    fName: String,
    lName: String,
    phone: String,
    email: String,
    locale: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: Date,
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ username: 1 }, { unique: true, name: '29_Sept_24_username_unique' });
userSchema.index({ email: 1 }, { unique: true, name: '29_Sept_24_email_unique' });

export { userSchema };
