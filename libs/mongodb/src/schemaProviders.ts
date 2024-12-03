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
import { Resource } from '@modules/resource/domain/entities/resource.entity';
import { resourceSchema } from '@modules/resource/domain/schema/resource.schema';
import { Email } from '@modules/email/domain/entities/email.entity';
import { emailSchema } from '@modules/email/domain/schema/email.schema';
import { LoginPassword } from '@modules/login-password/domain/entities/login-password.entity';
import { loginPasswordSchema } from '@modules/login-password/domain/schema/login-password.schema';
import { Phone } from '@modules/phone/domain/entities/phone.entity';
import { phoneSchema } from '@modules/phone/domain/schema/phone.schema';

export type SchemaProvider = {
  type: any;
  collection: Collection;
  schema: Schema;
};

export const schemaProviders: SchemaProvider[] = [
  { type: Email, schema: emailSchema, collection: Collection.EMAIL },
  { type: Group, schema: groupSchema, collection: Collection.GROUP },
  { type: LoginPassword, schema: loginPasswordSchema, collection: Collection.LOGIN_PASSWORD },
  { type: Phone, schema: phoneSchema, collection: Collection.PHONE },
  {
    type: RefreshToken,
    schema: refreshTokenSchema,
    collection: Collection.REFRESH_TOKEN,
  },
  {
    type: Resource,
    schema: resourceSchema,
    collection: Collection.RESOURCE,
  },
  { type: User, schema: userSchema, collection: Collection.USER },
  {
    type: UserGroup,
    schema: userGroupSchema,
    collection: Collection.USER_GROUP,
  },
  {
    type: Wallet,
    schema: walletSchema,
    collection: Collection.WALLET,
  },
];
