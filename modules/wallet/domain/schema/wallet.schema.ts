import { Collection } from '@common/constants/collections';
import { Schema } from 'mongoose';

export const walletSchema = new Schema(
  {
    symbolBase: String,
    symbolQuote: String,
    base: Number,
    quote: Number,
    buyPrice: Number,
    sellPrice: Number,
    owner: {
      type: Schema.Types.ObjectId,
      ref: Collection.USER,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: Collection.GROUP,
    },
    permission: [Number],
  },
  {
    timestamps: true,
  },
);

walletSchema.index(
  { symbol: 1, base: 1, onwer: 1, group: 1 },
  { unique: true, name: 'unique-symbol-base-owner-group_2024-10-17' },
);
walletSchema.index({ base: 1, quote: 1, owner: 1 }, { name: 'unique-base-quote-owner_2024-10-17' });
walletSchema.index({ owner: 1 }, { unique: true, name: 'unique-owner_2024-10-17' });
