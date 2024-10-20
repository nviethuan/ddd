import { Collections } from '@common/constants/collections';

export const toFieldName = (name: Collections) => {
  return `$${name}`;
};
