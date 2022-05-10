import { Nothing, Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class NotFoundUserError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `ユーザーが存在しません`, error);
  }
}
