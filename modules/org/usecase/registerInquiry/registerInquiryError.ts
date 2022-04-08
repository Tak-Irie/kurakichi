import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class ReceiverNotExistError extends Result<IIUsecaseError> {
  constructor(receiver: string, error?: Error) {
    super(false, `${receiver}は存在していません`, error);
  }
}
