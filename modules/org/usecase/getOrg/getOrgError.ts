import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class NotFoundOrgError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, `some message`, error);
  }
}
