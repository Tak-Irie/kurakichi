import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class UsersNotExistsError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, `ユーザーが見つかりませんでした`, error);
  }
}
