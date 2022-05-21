import { Nothing, Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class NotAuthorizedError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, "設定を更新する権限がありません", error);
  }
}
