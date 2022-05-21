import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class UsersNotFoundError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, "ユーザーが登録されていません", error);
  }
}
