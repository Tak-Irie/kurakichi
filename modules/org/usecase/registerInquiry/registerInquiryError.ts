import { Nothing, Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class ReceiverNotExistError extends Result<IUsecaseError> {
  constructor(receiver: string, error: Error | Nothing) {
    super(false, `${receiver}は存在していません`, error);
  }
}
