import { FieldError, Path, UseFormRegister } from 'react-hook-form';

import { PopOnIcon } from '..';
import { IconsCheckCircle, IconsQuestion } from './Icons';

type InputProps<T> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  fieldLabel?: string;
  type: 'date' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url';
  disable?: boolean;
  autoComplete?: 'email' | 'new-password' | 'current-password' | 'tel' | 'username';
  max?: number;
  minLength?: number;
  maxLength?: number;
  helperText?: string;
  errMessage?: string | FieldError;
  isValid?: boolean;
  overWriteCSS?: string;
  placeholder?: string;
};

type TextareaProps<T> = Omit<InputProps<T>, 'type'> & {
  rows: number;
  cols: number;
};

export const Input = <T extends any>({
  label,
  type,
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
        <label className="text-gray-700 text-xs font-bold my-1">{fieldLabel}</label>
      ) : null}
      <span className="ml-1">
        {helperText ? <PopOnIcon icon={<IconsQuestion />} content={helperText} /> : null}
      </span>
      {isValid ? (
        <IconsCheckCircle />
      ) : errMessage ? (
        <span className="ml-1 text-red-800 bg-red-100 p-1 text-xs rounded">{errMessage}</span>
      ) : (
        <span className="ml-1 text-red-500 text-xs">{required === true ? '必須項目' : null}</span>
      )}
    </div>
    {disable ? (
      <fieldset disabled>
        <input
          className={overWriteCSS}
          placeholder={placeholder}
          type={type}
          autoComplete={autoComplete}
          max={max}
          minLength={minLength}
          maxLength={maxLength}
          {...register(label, { required })}
        />
      </fieldset>
    ) : (
      <input
        className={overWriteCSS}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        {...register(label, { required })}
      />
    )}
  </>
);

export const InputTextarea = <T extends any>({
  cols,
  rows,
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
    <label className="text-gray-700 text-xs font-bold my-1 mr-auto">{fieldLabel}</label>
    {helperText ? <PopOnIcon icon={<IconsQuestion />} content={helperText} /> : null}
    {errMessage ? <span>a</span> : null}
    <textarea
      placeholder={placeholder}
      cols={cols}
      rows={rows}
      className={overWriteCSS}
      {...register(label, { required })}
    />
  </>
);
