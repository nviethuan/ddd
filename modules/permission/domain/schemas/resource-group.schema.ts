import { Collection } from '@common/constants/collections';
import { Schema } from 'mongoose';

const resourceGroupSchema = new Schema(
  {
    resource: {
      type: Schema.Types.ObjectId,
      ref: Collection.RESOURCE,
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

resourceGroupSchema.index({ resource: 1, group: 1 }, { unique: true, name: '29_Sept_24_resource_group_unique' });

export { resourceGroupSchema };
