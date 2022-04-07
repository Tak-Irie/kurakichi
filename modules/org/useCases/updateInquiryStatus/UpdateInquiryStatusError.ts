import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class _no_unique_error_now extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `_`, error);
  }
}
