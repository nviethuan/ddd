import { Schema } from 'mongoose';

const userGroupSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

userGroupSchema.index({ user: 1, group: 1 }, { unique: true, name: '29_Sept_24_user_group_unique' });

export { userGroupSchema };
