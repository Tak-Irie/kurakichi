export abstract class IUsecaseError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
