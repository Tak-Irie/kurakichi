import { Result } from "../../../shared/Result";
import { IIUsecaseError } from "../../../shared/usecase";

export class UserNotExistsOrDeletedError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, "こちらのユーザーは存在しないか、既に削除されています", error);
  }
}
