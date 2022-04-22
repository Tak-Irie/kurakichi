import { Nothing, Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class _no_unique_error_now extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `_`, error);
  }
}
