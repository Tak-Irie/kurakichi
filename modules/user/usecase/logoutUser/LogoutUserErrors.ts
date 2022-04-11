import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class NotFoundUserError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, "ユーザーが存在していません", error);
  }
}
