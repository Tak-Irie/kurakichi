import argon2 from "argon2";

class Hash {
  static async hashByArgon2({
    plainText,
  }: {
    plainText: string;
  }): Promise<string> {
    return await argon2.hash(plainText);
  }
}

export { Hash };
