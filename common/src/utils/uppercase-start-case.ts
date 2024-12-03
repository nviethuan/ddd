import { startCase } from 'lodash';

export function uppercaseStartCase(value: string): string {
  return startCase(`${value || ''}`.trim().toLowerCase());
}
