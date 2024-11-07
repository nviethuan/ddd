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
    symbol: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
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
  { symbolBase: 1, onwer: 1, group: 1 },
  { unique: true, name: 'unique-symbol-base-owner-group_2024-10-17' },
);
walletSchema.index({ symbolBase: 1, symbolQuote: 1, owner: 1 }, { name: 'unique-base-quote-owner_2024-10-17' });
walletSchema.index({ symbol: 1, onwer: 1, group: 1 }, { name: 'symbol_2024-11-07' });
