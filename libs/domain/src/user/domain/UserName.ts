import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/Result';
import { Guard } from '../../shared/Guard';
import { Validation } from '../../shared/Validation';

type UserNameProps = {
  userName: string;
};

export class UserName extends ValueObject<UserNameProps> {
  public static MIN_LENGTH = 2;
  public static MAX_LENGTH = 20;

  private constructor(props: UserNameProps) {
    super(props);
  }

  getValue(): string {
    return this.props.userName;
  }

  public static create(props: UserNameProps): Result<UserName> {
    const usernameResult = Guard.falsyCheck({
      argument: props.userName,
      argumentName: 'userName',
    });
    if (!usernameResult.succeeded) {
      return Result.fail<UserName>(usernameResult.message);
    }
    const greaterEnough = Validation.valueGreaterThanLimit(this.MIN_LENGTH, props.userName);
    if (!greaterEnough) {
      return Result.fail<UserName>('ユーザー名は最小2文字です');
    }

    const lessEnough = Validation.valueLessThanLimit(this.MAX_LENGTH, props.userName);
    if (!lessEnough) {
      return Result.fail<UserName>('ユーザー名は最大20文字です');
    }

    return Result.success<UserName>(new UserName(props));
  }

  public static restoreFromRepo(userName: string): UserName {
    return new UserName({ userName });
  }
}
