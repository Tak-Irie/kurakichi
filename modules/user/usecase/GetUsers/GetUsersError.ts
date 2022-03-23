import { Result } from "../../../shared/core";
import { UseCaseError } from "../../../shared/usecase";

export class UsersNotFoundError extends Result<UseCaseError> {
  constructor() {
    super(false, "ユーザーが登録されていません", "NOTHING");
  }
}
