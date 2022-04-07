import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class _no_unique_err extends Result<IUseCaseError> {
  constructor(some: unknown, error?: Error) {
    super(false, `some message`, error);
  }
}
