import { argon2i } from 'argon2-ffi';
import crypto from 'crypto';

type HashArgs = {
  rawPassword: string;
};

type verifyArgs = {
  rawPassword: string;
  storedHash: string;
};

class Hash {
  public static async hashByArgon2({ rawPassword }: HashArgs): Promise<string> {
    const salt = this.getRandomBytes(32);
    const hashedPassword = await argon2i.hash(rawPassword, salt);
    return hashedPassword;
  }
  public static async verifyByArgon2({
    rawPassword,
    storedHash,
  }: verifyArgs): Promise<boolean> {
    const _password = Buffer.from(rawPassword);
    const isCorrect = await argon2i.verify(storedHash, _password);

    return isCorrect;
  }
  private static getRandomBytes(size: number): Buffer {
    const bytes = crypto.randomBytes(size);
    return bytes;
  }
}
export { Hash };
