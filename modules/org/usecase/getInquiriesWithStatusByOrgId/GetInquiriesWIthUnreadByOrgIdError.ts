import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class _no_unique_err extends Result<IIUsecaseError> {
  constructor(some: unknown, error?: Error) {
    super(false, `some message`, error);
  }
}
