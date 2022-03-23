import { Result } from "../core/Result";
import { UseCaseError } from "./UseCaseError";

export class InputInvalidValueError extends Result<UseCaseError> {
  public constructor(message: string | string[], error: Error | "NOTHING") {
    if (Array.isArray(message)) {
      message = message.filter(Boolean).join("\n");
    }
    super(false, message, error);
  }
}
