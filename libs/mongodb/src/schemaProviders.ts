import { userSchema } from '@modules/user/domain/schema/user.schema';
import { User } from '@modules/user/domain/entities/user.entity';
import { Schema } from 'mongoose';
import { Group } from '@modules/group/domain/entities/group.entity';
import { groupSchema } from '@modules/group/domain/schema/group.schema';
import { UserGroup } from '@modules/user-group/domain/entities/user-group.entity';
import { userGroupSchema } from '@modules/user-group/domain/schema/user-group.schema';
import { RefreshToken } from '@modules/refresh-token/domain/entities/refresh-token.entity';
import { refreshTokenSchema } from '@modules/refresh-token/domain/schema/refresh-token.schema';
import { Wallet } from '@modules/wallet/domain/entities/wallet.entity';
import { walletSchema } from '@modules/wallet/domain/schema/wallet.schema';
import { Collection } from '@common/constants/collections';

export type SchemaProvider = {
  type: any;
  collection: Collection;
  schema: Schema;
};

export const schemaProviders: SchemaProvider[] = [
  { type: User, schema: userSchema, collection: Collection.USER },
  { type: Group, schema: groupSchema, collection: Collection.GROUP },
  {
    type: UserGroup,
    schema: userGroupSchema,
    collection: Collection.USER_GROUP,
  },
  {
    type: RefreshToken,
    schema: refreshTokenSchema,
    collection: Collection.REFRESH_TOKEN,
  },
  {
    type: Wallet,
    schema: walletSchema,
    collection: Collection.WALLET,
  },
];
