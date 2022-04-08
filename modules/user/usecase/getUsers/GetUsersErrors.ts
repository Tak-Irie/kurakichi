import { IIUsecaseError, Result } from "../../../shared";

export class UsersNotFoundError extends Result<IIUsecaseError> {
  constructor() {
    super(false, "ユーザーが登録されていません");
  }
}
