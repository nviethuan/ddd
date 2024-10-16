import { Schema } from 'mongoose';

export const refreshTokenSchema = new Schema(
  {
    uid: Schema.Types.ObjectId,
    refreshToken: String,
  },
  {
    timestamps: true,
  },
);

refreshTokenSchema.index(
  {
    updatedAt: 1,
  },
  {
    expireAfterSeconds: 2_592_000, // 30 days in seconds,
    name: 'refresh-token-expired_2024-10-16',
  },
);

refreshTokenSchema.index(
  {
    uid: 1,
  },
  {
    name: 'uid_2024-10-16',
  },
);

refreshTokenSchema.index(
  {
    refreshToken: 1,
  },
  {
    name: 'refresh-token_2024-10-16',
  },
);
