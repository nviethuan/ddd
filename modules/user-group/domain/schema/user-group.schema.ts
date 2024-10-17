import { Schema } from 'mongoose';

const userGroupSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    groupId: {
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

userGroupSchema.index({ userId: 1, groupId: 1 }, { unique: true, name: '29_Sept_24_user_group_unique' });

export { userGroupSchema };
