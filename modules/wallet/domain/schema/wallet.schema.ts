import { Schema } from 'mongoose';

export const walletSchema = new Schema({
  symbol: String,
  base: Number,
  quote: Number,
  buyPrice: Number,
  sellPrice: Number,
});
