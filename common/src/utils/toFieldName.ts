import { Collection } from '@common/constants/collections';

export const toFieldName = (name: Collection) => {
  return `$${name}`;
};
