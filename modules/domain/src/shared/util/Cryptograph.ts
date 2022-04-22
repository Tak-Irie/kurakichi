import crypto from "crypto";

type CryptographConstructor = {
  password: string;
  salt: string;
};

class Cryptograph {
  private ALGORITHM = "aes-256-cbc";
  private password: string;
  private salt: string;

  constructor({ password, salt }: CryptographConstructor) {
    this.password = password;
    this.salt = salt;
  }

  public encrypt(data: string) {
    const key = crypto.scryptSync(this.password, this.salt, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

    let encryptedData = cipher.update(data);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);

    return {
      iv: iv.toString("hex"),
      encryptedData: encryptedData.toString("hex"),
    };
  }

  public decrypt(iv: string, encryptedData: string) {
    const key = crypto.scryptSync(this.password, this.salt, 32);
    const decipher = crypto.createDecipheriv(
      this.ALGORITHM,
      key,
      Buffer.from(iv, "hex")
    );

    let decryptedData = decipher.update(Buffer.from(encryptedData, "hex"));
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);

    return decryptedData.toString();
  }
}
export { Cryptograph };
