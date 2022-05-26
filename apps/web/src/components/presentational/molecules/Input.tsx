/* eslint-disable no-nested-ternary */
import { Path, UseFormRegister } from 'react-hook-form';
import { PopOnIcon } from '../atoms';

import { IconsCheckCircle, IconsQuestion } from '../atoms/Icons';

export type InputValue = {
  [key: string]: string;
};

type InputProps<T extends InputValue> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  pattern: RegExp;
  fieldLabel?: string;
  type:
    | 'date'
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url';
  disable?: boolean;
  autoComplete?:
    | 'email'
    | 'new-password'
    | 'current-password'
    | 'tel'
    | 'username';
  max?: number;
  minLength?: number;
  maxLength?: number;
  helperText?: string;
  errMessage?: string;
  isValid?: boolean;
  overWriteCSS?: string;
  placeholder?: string;
};

type TextareaProps<T extends InputValue> = Omit<InputProps<T>, 'type'> & {
  rows: number;
  cols: number;
};

export const Input = <T extends InputValue>({
  label,
  type,
  pattern,
  autoComplete,
  fieldLabel,
  register,
  disable,
  helperText,
  errMessage,
  isValid,
  required,
  max,
  minLength,
  maxLength,
  placeholder = '',
  overWriteCSS = 'flex-grow w-full h-12 px-4 mb-3 text-black border-gray-300 border shadow-sm rounded appearance-none focus:outline-none focus:border-gray-700',
}: InputProps<T>) => (
  <>
    <div className="flex justify-start items-center">
      {fieldLabel ? (
        <text className="my-1 text-xs font-bold text-gray-700">
          {fieldLabel}
        </text>
      ) : null}
      <span className="ml-1">
        {helperText ? (
          <PopOnIcon icon={<IconsQuestion />} content={helperText} />
        ) : null}
      </span>
      {isValid ? (
        <IconsCheckCircle />
      ) : errMessage ? (
        <span className="p-1 ml-1 text-xs text-red-800 bg-red-100 rounded">
          {errMessage}
        </span>
      ) : (
        <span className="ml-1 text-xs text-red-500">
          {required === true ? '必須項目' : null}
        </span>
      )}
    </div>
    <fieldset disabled={disable}>
      <input
        className={overWriteCSS}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        {...register(label, { required, pattern })}
      />
    </fieldset>
  </>
);

export const InputTextarea = <T extends InputValue>({
  cols,
  rows,
  pattern,
  errMessage,
  helperText,
  fieldLabel,
  label,
  register,
  required,
  placeholder = '',
  overWriteCSS = 'flex-grow w-full h-32 px-4 my-2 text-gray-800 border border-gray-400 rounded',
}: TextareaProps<T>) => (
  <>
    <text className="my-1 mr-auto text-xs font-bold text-gray-700">
      {fieldLabel}
    </text>
    {helperText ? (
      <PopOnIcon icon={<IconsQuestion />} content={helperText} />
    ) : null}
    {errMessage ? <span>a</span> : null}
    <textarea
      placeholder={placeholder}
      cols={cols}
      rows={rows}
      className={overWriteCSS}
      {...register(label, { required, pattern })}
    />
  </>
);
