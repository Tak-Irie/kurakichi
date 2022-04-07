import { Result } from "../../shared copy/Result";
import { ValueObject } from "../../shared copy/domain/ValueObject";
import validator from "validator";

export type ValidURLProps = {
  url: string;
};

export class ValidURL extends ValueObject<ValidURLProps> {
  private constructor(props: ValidURLProps) {
    super(props);
  }

  getURL(): string {
    return this.props.url;
  }

  public static create(props: ValidURLProps): Result<ValidURL> {
    if (!this.isValidURL(props.url)) {
      return Result.fail<ValidURL>("URL:許可されていない形式です");
    }

    return Result.success<ValidURL>(new ValidURL({ url: props.url }));
  }

  private static isValidURL(unidentifiedUrl: string): boolean {
    if (unidentifiedUrl === "UNKNOWN") return true;

    return validator.isURL(unidentifiedUrl);
  }

  /**
   * used only data mapper in infra layer
   */
  public static restoreFromRepo(storedUrl: string): ValidURL {
    return new ValidURL({ url: storedUrl });
  }
}
