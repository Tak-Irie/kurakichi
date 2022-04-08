import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class NotAuthorizedError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, "設定を更新する権限がありません", error);
  }
}
