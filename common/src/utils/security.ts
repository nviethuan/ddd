import { USER_GROUPS__ENCRYPTION_KEY } from '@common/configs/envs';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export const encode = (data: string) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(USER_GROUPS__ENCRYPTION_KEY, 'hex'), iv);

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ':' + encrypted;
};

export const decode = (data: string) => {
  const parts = data.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');

  const decipher = createDecipheriv('aes-256-cbc', Buffer.from(USER_GROUPS__ENCRYPTION_KEY, 'hex'), iv);

  let decrypted = decipher.update(encryptedText, undefined, 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
