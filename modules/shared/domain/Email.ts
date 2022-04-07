import { Result } from "../../shared copy/Result";
import { ValueObject } from "../../shared copy/domain/ValueObject";
import validator from "validator";

export type EmailProps = {
  email: string;
};

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  getValue(): string {
    return this.props.email;
  }

  private static isValidEmail(unidentifiedEmail: string) {
    return validator.isEmail(unidentifiedEmail);
  }

  private static formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: EmailProps): Result<Email> {
    if (!this.isValidEmail(email.email)) {
      return Result.fail<Email>(
        "メールアドレスに使用できない文字が含まれています"
      );
    }

    return Result.success<Email>(
      new Email({ email: this.formatEmail(email.email) })
    );
  }

  public static restoreFromRepo(email: string): Email {
    return new Email({ email });
  }
}
