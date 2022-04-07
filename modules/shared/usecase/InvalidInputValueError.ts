import { IUseCaseError } from "../../shared copy/useCase/IUseCaseError";
import { Result } from "../../shared copy/Result";

export class InvalidInputValueError extends Result<IUseCaseError> {
  public constructor(message: string | string[], error?: Error) {
    if (Array.isArray(message)) {
      message = message.filter(Boolean).join("\n");
    }
    super(false, message, error);
  }
}
