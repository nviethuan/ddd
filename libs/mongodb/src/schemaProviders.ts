import { userSchema } from '@modules/user/domain/schema/user.schema';
import { User } from '@modules/user/domain/entities/user.entity';
import { Schema } from 'mongoose';
import { Group } from '@modules/group/domain/entities/group.entity';
import { groupSchema } from '@modules/group/infrastructure/schema/group.schema';
import { UserGroup } from '@modules/user-group/domain/entities/user-group.entity';
import { userGroupSchema } from '@modules/user-group/infrastructure/schema/user-group.schema';
import { RefreshToken } from '@modules/refresh-token/domain/entities/refresh-token.entity';
import { refreshTokenSchema } from '@modules/refresh-token/domain/schema/refresh-token.schema';

export type SchemaProvider = {
  type: any;
  schema: Schema;
};

export const schemaProviders: SchemaProvider[] = [
  { type: User, schema: userSchema },
  { type: Group, schema: groupSchema },
  {
    type: UserGroup,
    schema: userGroupSchema,
  },
  {
    type: RefreshToken,
    schema: refreshTokenSchema,
  },
];
