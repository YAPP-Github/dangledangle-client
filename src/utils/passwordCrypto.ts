import * as crypto from 'crypto';

const createSHA256Hash = (key: string) =>
  crypto.createHash('sha256').update(key).digest();

// 암호화 함수
export const encrypt = (text: string, secret: string) => {
  const key = createSHA256Hash(String(secret));

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const result = iv.toString('hex') + ':' + encrypted.toString('hex');
  return result;
};

// 복호화 함수
export const decrypt = (text: string, secret: string) => {
  const key = createSHA256Hash(String(secret));

  const textParts = text.split(':');

  const ivString = textParts.shift();
  if (!ivString) throw new Error('암호화된 text 형식이 아닙니다.');

  const iv = Buffer.from(ivString, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');

  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  const result = decrypted.toString();
  return result;
};
