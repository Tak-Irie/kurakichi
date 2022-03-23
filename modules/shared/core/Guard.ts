export interface IGuardArgument {
  argument: unknown;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];
export interface IGuardResult {
  succeeded: boolean;
  message: string;
}

export class Guard {
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    for (const result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return { succeeded: true, message: "Success!" };
  }

  public static greaterThan(
    minValue: number,
    actualValue: number
  ): IGuardResult {
    return actualValue > minValue
      ? { succeeded: true, message: "Success!" }
      : {
          succeeded: false,
          message: `Number given {${actualValue}} is not greater than {${minValue}}`,
        };
  }

  public static againstAtLeast(
    atLeastNum: number,
    actualValue: string
  ): IGuardResult {
    return actualValue.length >= atLeastNum
      ? { succeeded: true, message: "Success!" }
      : {
          succeeded: false,
          message: `Text is not at least ${atLeastNum} chars.`,
        };
  }

  public static againstAtMost(
    atMostNum: number,
    actualValue: string
  ): IGuardResult {
    return actualValue.length <= atMostNum
      ? { succeeded: true, message: "Success!" }
      : {
          succeeded: false,
          message: `Text is greater than ${atMostNum} chars.`,
        };
  }

  public static againstNullOrUndefined(
    argument: unknown,
    argumentName: string
  ): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined`,
      };
    } else {
      return { succeeded: true, message: "Exists!" };
    }
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection
  ): IGuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );
      if (!result.succeeded) return result;
    }

    return { succeeded: true, message: "Exists!" };
  }

  public static isOneOf(
    value: unknown,
    validValues: unknown[],
    argumentName: string
  ): IGuardResult {
    let isValid = false;
    for (const validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return { succeeded: true, message: "Success!" };
    } else {
      return {
        succeeded: false,
        message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
          validValues
        )}. Got "${value}".`,
      };
    }
  }

  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string
  ): IGuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return {
        succeeded: false,
        message: `${argumentName} is not within range ${min} to ${max}.`,
      };
    } else {
      return { succeeded: true, message: "Success!" };
    }
  }

  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string
  ): IGuardResult {
    let failingResult: IGuardResult = {
      succeeded: false,
      message: "NOTHING",
    };
    for (const num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    }

    if (!failingResult.succeeded) {
      return {
        succeeded: false,
        message: `${argumentName} is not within the range.`,
      };
    } else {
      return { succeeded: true, message: "NOTHING" };
    }
  }
}
