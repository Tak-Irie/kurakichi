import * as crypto from 'crypto';

class Cryptograph {
  private static ALGORITHM = 'aes-256-cbc';
  private static PASSWORD = process.env.NX_CRYPT_PASS as string;
  private static SALT = process.env.NX_CRYPT_SALT as string;

  public static encrypt(data: string) {
    const key = crypto.scryptSync(this.PASSWORD, this.SALT, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

    let encryptedData = cipher.update(data);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);

    return { iv: iv.toString('hex'), encryptedData: encryptedData.toString('hex') };
  }

  public static decrypt(iv: string, encryptedData: string) {
    const key = crypto.scryptSync(this.PASSWORD, this.SALT, 32);
    const decipher = crypto.createDecipheriv(this.ALGORITHM, key, Buffer.from(iv, 'hex'));

    let decryptedData = decipher.update(Buffer.from(encryptedData, 'hex'));
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);

    return decryptedData.toString();
  }
}
export { Cryptograph };
