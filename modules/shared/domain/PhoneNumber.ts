import { Result } from "../core/Result";
import { PhoneNumberRegExp } from "../util";
import { ValueObject } from "./ValueObject";

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
    return PhoneNumberRegExp.test(phoneNumber);
  }

  public static create(props: PhoneNumberProps): Result<PhoneNumber> {
    if (!this.isValidPhoneNumber(props.phoneNumber)) {
      return Result.fail<PhoneNumber>("電話番号:存在しない形式です");
    }

    return Result.success<PhoneNumber>(
      new PhoneNumber({ phoneNumber: props.phoneNumber })
    );
  }

  public static restoreFromRepo(phoneNumber: string): PhoneNumber {
    return new PhoneNumber({ phoneNumber });
  }
}
