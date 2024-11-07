import { BaseModelWithTimestamps, ID } from '@common/types/baseModel';

export class LoginPassword extends BaseModelWithTimestamps {
  entityId: ID;
  hash: string;
}
