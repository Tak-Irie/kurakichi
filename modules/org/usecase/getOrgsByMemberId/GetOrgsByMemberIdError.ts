import { Result } from "../../../shared";
import { IUsecaseError } from "../../../shared";

export class NotFoundOrgError extends Result<IUsecaseError> {
  constructor(error?: Error) {
    super(false, `団体が存在していません`, error);
  }
}
