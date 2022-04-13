import { Nothing } from "./Nothing";

export type PropInResult<TYPE> = { [PROP in keyof TYPE]: Result<TYPE[PROP]> };
export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: T | string | Nothing;
  private _value: T | Nothing;

  public constructor(
    isSuccess: boolean,
    error: T | string | Nothing,
    value: T | Nothing
  ) {
    if (isSuccess && error) {
      throw new Error(
        "InvalidOperation: A result cannot be successful and contain an error"
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        "InvalidOperation: A failing result needs to contain an error message"
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      console.log(this.error);
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }

    return this._value as T;
  }

  public errorValue(): T {
    return this.error as T;
  }
  public getErrorValue() {
    return this.error as string;
  }

  public static success<U>(value: U): Result<U> {
    return new Result<U>(true, "Success!", value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error, "");
  }

  public static verifyResult<U>(result: Result<U>): Result<U> {
    if (result.isFailure) {
      return Result.fail<U>(result.getErrorValue());
    }

    return Result.success<U>(result.getValue());
  }

  public static verifyResults<U>(results: Result<U>[]): Result<U>[] {
    const isInvalid = results.filter(({ isFailure }) => isFailure === true);
    if (isInvalid[0]) {
      return isInvalid;
    }
    return results;
  }

  //TODO:YAGNI
  // public static combine<U>(results: Result<U>[]): Result<U> {
  //   for (const result of results) {
  //     if (result.isFailure) return result;
  //   }
  //   return Result<U>.ok();
  // }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
