import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class _no_unique_error_now extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, `_`, error);
  }
}
