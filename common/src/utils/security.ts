import { USER_GROUPS__ENCRYPTION_KEY } from '@common/configs/envs';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export const ENCRYPTION_SEPARATOR = '.';
export const ENCRYPTION_ALGORITHM = 'aes-256-cbc';

export const encode = (data: string) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ENCRYPTION_ALGORITHM, Buffer.from(USER_GROUPS__ENCRYPTION_KEY, 'hex'), iv);

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ENCRYPTION_SEPARATOR + encrypted;
};

export const decode = (data: string) => {
  const [iv, encryptedText] = data.split(ENCRYPTION_SEPARATOR).map((txt) => Buffer.from(txt, 'hex'));

  const decipher = createDecipheriv(ENCRYPTION_ALGORITHM, Buffer.from(USER_GROUPS__ENCRYPTION_KEY, 'hex'), iv);

  let decrypted = decipher.update(encryptedText, undefined, 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
