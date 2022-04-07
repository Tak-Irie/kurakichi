import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

export class Validation {
  public static valueGreaterThanLimit(
    minLength: number,
    inputValue: string
  ): boolean {
    return inputValue.length > minLength;
  }

  public static valueLessThanLimit(
    maxLength: number,
    inputValue: string
  ): boolean {
    return maxLength > inputValue.length;
  }

  public static sanitizeText(unidentifiedText: string): string {
    const { window } = new JSDOM("<!DOCTYPE html>");
    const domPurify = DOMPurify(window);
    return domPurify.sanitize(unidentifiedText);
  }
}
