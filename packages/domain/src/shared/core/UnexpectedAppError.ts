import { Result } from "./Result";

export class UnexpectedAppError extends Result<any> {
  public constructor(err: any) {
    super(false, err, "");
    console.log(`[UnexpectedAppError]: An unexpected error occurred`);
    console.error(err);
  }
}
