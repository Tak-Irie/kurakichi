import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

// no inquiry is valid
export class InquiryNotExistError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `問い合わせが存在していません`, error);
  }
}
