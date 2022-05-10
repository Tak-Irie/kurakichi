import { Nothing, Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

// no inquiry is valid
export class NotExistInquiryError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `問い合わせが存在していません`, error);
  }
}
