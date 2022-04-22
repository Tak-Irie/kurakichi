import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class UserNotExistsOrDeletedError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, "こちらのユーザーは存在しないか、既に削除されています", error);
  }
}
