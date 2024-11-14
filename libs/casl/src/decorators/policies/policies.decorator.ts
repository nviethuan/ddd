import { InferSubjects, PureAbility } from '@casl/ability';
import { User } from '@modules/user/domain/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export const CHECK_POLICIES_KEY = 'policies';

type Subjects = InferSubjects<typeof User> | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;

export const Policies = (...args: [Action, Subjects][]) => SetMetadata('policies', args);
