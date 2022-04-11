import { Result } from "../core/Result";
import { IUsecaseError } from ".";

export class InvalidInputValueError extends Result<IUsecaseError> {
  public constructor(message: string | string[], error: Error | "") {
    if (Array.isArray(message)) {
      message = message.filter(Boolean).join("\n");
    }
    super(false, message, error);
  }
}
