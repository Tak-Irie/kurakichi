import { Result } from '../../shared/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

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

  private static isValidEmail(email: string) {
    const emailRegExp = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    return emailRegExp.test(email);
  }

  private static formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: EmailProps): Result<Email> {
    if (!this.isValidEmail(email.email)) {
      return Result.fail<Email>('メールアドレスに使用できない文字が含まれています');
    }

    return Result.success<Email>(new Email({ email: this.formatEmail(email.email) }));
  }
}
