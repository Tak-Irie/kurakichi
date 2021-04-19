import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class ReceiverNotExistError extends Result<IUseCaseError> {
  constructor(receiver: string, error?: Error) {
    super(false, `${receiver}は存在していません`, error);
  }
}
