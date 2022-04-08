import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

// no inquiry is valid
export class InquiryNotExistError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, `問い合わせが存在していません`, error);
  }
}
