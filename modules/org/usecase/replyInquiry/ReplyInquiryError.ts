import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class InquiryNotExistError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, `お問い合わせが存在しません`, error);
  }
}
