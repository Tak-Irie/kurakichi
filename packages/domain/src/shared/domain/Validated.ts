// TODO:used for domain object to avoid duplicate validation
export interface Validated<T> {
  isSafe: boolean;
  safeValue: T | "";
}
