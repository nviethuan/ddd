import { BaseModelWithTimestamps, ID } from '@common/types/baseModel';

export class LoginPassword extends BaseModelWithTimestamps {
  refId: ID;
  hash: string;
}
