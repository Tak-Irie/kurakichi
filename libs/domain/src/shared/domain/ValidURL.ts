import { Result } from '../../shared/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

export type ValidURLProps = {
  url: string;
};

export class ValidURL extends ValueObject<ValidURLProps> {
  private constructor(props: ValidURLProps) {
    super(props);
  }

  getValue(): string {
    return this.props.url;
  }

  // FIXME: add validation
  private static isValidURL(url: string) {
    const urlRegExp = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    return urlRegExp.test(url);
  }

  // private static formatEmail(url: string): string {
  //   return url.trim().toLowerCase();
  // }

  public static create(props: ValidURLProps): Result<ValidURL> {
    if (!this.isValidURL(props.url)) {
      return Result.fail<ValidURL>('許可されていないURLです');
    }

    return Result.success<ValidURL>(new ValidURL({ url: props.url }));
  }
}
