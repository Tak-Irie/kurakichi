import * as argon2 from 'argon2';

import { Guard } from '../../../shared/Guard';
import { Result } from '../../../shared/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';

type UserPasswordProps = {
  password: string;
  isHashed?: boolean;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props);
  }

  getValue(): string {
    return this.props.password;
  }

  public static async create(props: UserPasswordProps): Promise<Result<UserPassword>> {
    let password = props.password;
    const propsResult = Guard.falsyCheck({
      argument: password,
      argumentName: 'password',
    });

    if (!propsResult.succeeded) {
      return Result.fail<UserPassword>(propsResult.message);
    }
    if (!props.isHashed && !this.isAppropriateLength(props.password)) {
      return Result.fail<UserPassword>('パスワードは8文字以上に設定してください');
    }

    if (props.isHashed == undefined) {
      password = await this.hashPassword(password);
    }

    return Result.success<UserPassword>(
      new UserPassword({
        password,
        isHashed: true,
      }),
    );
  }

  public static isAppropriateLength(password: string): boolean {
    return password.length >= 8;
  }

  // public async getHashedValue(): Promise<string> {
  //   if (this.isAlreadyHashed()) return this.props.password;

  //   return await this.hashPassword(this.props.password);
  // }

  private static async hashPassword(password: string): Promise<string> {
    const hashedPassword = await argon2.hash(password);

    return hashedPassword;
  }

  // public async comparePassword(plainTextPassword: string): Promise<boolean> {
  //   let isHashed: string;
  //   if (this.isAlreadyHashed()) {
  //     isHashed = this.props.password;

  //     return this.verifyPassword(plainTextPassword, isHashed);
  //   }

  //   return this.props.password === plainTextPassword;
  // }

  public static async verifyPassword(plainText: string, hashed: string): Promise<boolean> {
    const result = await argon2.verify(hashed, plainText);

    return result;
  }

  /**
   * @method check this.props.isHashed
   * @returns boolean
   */
  public isAlreadyHashed(): boolean {
    if (!this.props.isHashed) return false;

    return this.props.isHashed;
  }
}
