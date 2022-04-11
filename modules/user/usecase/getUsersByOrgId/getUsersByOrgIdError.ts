import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class NotFoundOrgError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, `指定された団体が存在していません`, error);
  }
}
