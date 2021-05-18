import { Result } from '../../shared/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

export type PhoneNumberProps = {
  phoneNumber: string;
};

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  private constructor(props: PhoneNumberProps) {
    super(props);
  }

  getValue(): string {
    return this.props.phoneNumber;
  }

  // FIXME: add validation
  private static isValidPhoneNumber(phoneNumber: string) {
    const phoneNumberRegExp = /^0[789]0-[0-9]{4}-[0-9]{4}$|^0([0-9]-[0-9]{4}|[0-9]{2}-[0-9]{3}|[0-9]{3}-[0-9]{2}|[0-9]{4}-[0-9])-[0-9]{4}$/;

    return phoneNumberRegExp.test(phoneNumber);
  }

  public static create(props: PhoneNumberProps): Result<PhoneNumber> {
    if (!this.isValidPhoneNumber(props.phoneNumber)) {
      return Result.fail<PhoneNumber>('電話番号:存在しない形式です');
    }

    return Result.success<PhoneNumber>(new PhoneNumber({ phoneNumber: props.phoneNumber }));
  }

  public static restoreFromRepo(phoneNumber: string): PhoneNumber {
    return new PhoneNumber({ phoneNumber });
  }
}
