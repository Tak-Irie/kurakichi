import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class AlreadyRegisteredNameError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `こちらの団体名は既に登録されております`, error);
  }
}
