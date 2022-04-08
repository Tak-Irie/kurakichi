import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

// no unique err
export class _ extends Result<IUseCaseError> {
  constructor(some: unknown, error?: Error) {
    super(false, `some message`, error);
  }
}
