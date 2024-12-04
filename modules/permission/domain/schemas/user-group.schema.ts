import { Collection } from '@common/constants/collections';
import { Schema } from 'mongoose';

const userGroupSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: Collection.USER,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: Collection.GROUP,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: Collection.USER,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: Collection.USER,
    },
  },
  {
    timestamps: true,
  },
);

userGroupSchema.index({ user: 1, group: 1 }, { unique: true, name: '29_Sept_24_user_group_unique' });

export { userGroupSchema };
