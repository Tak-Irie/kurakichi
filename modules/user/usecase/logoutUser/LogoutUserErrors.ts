import { IIUsecaseError, Result } from "../../../shared";

export class UserNotFoundOrDeletedError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, "ユーザーが存在していないか、既に削除されています", error);
  }
}
