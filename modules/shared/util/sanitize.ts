import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

export const valueGreaterThanLimit = (minLength: number, inputValue: string): boolean => {
  return inputValue.length > minLength;
};

export const valueLessThanLimit = (maxLength: number, inputValue: string): boolean => {
  return maxLength > inputValue.length;
};

export const sanitizeText = (unpurifiedText: string): string => {
  const { window } = new JSDOM('<!DOCTYPE html>');
  const domPurify = DOMPurify(window);
  return domPurify.sanitize(unpurifiedText);
};
