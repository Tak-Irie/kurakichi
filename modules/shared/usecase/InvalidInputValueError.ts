import { Result } from "../core";
import { UseCaseError } from "./UseCaseError";

export class InvalidInputValueError extends Result<UseCaseError> {
  public constructor(message: string | string[], error?: Error) {
    if (Array.isArray(message)) {
      message = message.filter(Boolean).join("\n");
    }
    super(false, message, error ? error : "NOTHING");
  }
}
