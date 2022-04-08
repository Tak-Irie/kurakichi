import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class UsersNotExistsError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, `ユーザーが見つかりませんでした`, error);
  }
}
