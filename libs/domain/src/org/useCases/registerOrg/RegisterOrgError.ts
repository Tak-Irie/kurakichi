import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class SomeError extends Result<IUseCaseError> {
  constructor(some: unknown, error?: Error) {
    super(false, `some message`, error);
  }
}
