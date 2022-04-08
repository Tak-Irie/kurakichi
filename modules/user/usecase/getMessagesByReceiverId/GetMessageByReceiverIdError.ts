import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

// no unique err
export class _ extends Result<IIUsecaseError> {
  constructor(some: unknown, error?: Error) {
    super(false, `some message`, error);
  }
}
