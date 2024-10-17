import { createHash } from 'crypto';

export function generateHashSha512(input: string): string {
  return [
    createHash('sha512').update(`${new Date()}${input}${Date.now()}${Math.random()}`).digest('hex'),
    createHash('sha512').update(`${new Date()}${input}${Date.now()}${Math.random()}`).digest('hex'),
  ]
    .join('')
    .toUpperCase();
}
