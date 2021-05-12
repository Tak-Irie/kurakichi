import { FieldError, FieldErrors, Path, UseFormRegister } from 'react-hook-form';

import { PopOnIcon } from '@next/ui';
import { IconsCheckCircle, IconsQuestion } from './Icons';

type InputProps<T> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  fieldLabel: string;
  type: 'date' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url';
  disable?: boolean;
  autoComplete?: 'email' | 'new-password' | 'current-password' | 'tel' | 'username';
  max?: number;
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
  maxLength,
  placeholder = '',
  overWriteCSS = 'flex-grow w-full h-12 px-4 mb-3 text-black border-gray-300 border shadow-sm rounded appearance-none focus:outline-none focus:border-gray-700',
}: InputProps<T>) => (
  <>
    <div className="flex justify-start items-center">
      <label className="text-gray-700 text-xs font-bold my-1">{fieldLabel}</label>
      <span className="ml-1">
        {helperText ? <PopOnIcon icon={<IconsQuestion />} content={helperText} /> : null}
      </span>
      {isValid ? (
        <IconsCheckCircle />
      ) : (
        <span className="ml-1 text-red-500 text-xs">
          {errMessage ? errMessage : required === true ? '必須項目' : null}
        </span>
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
  overWriteCSS = 'flex-grow w-full h-24 px-4 mb-3 text-gray-800 transition duration-200 border-2 border-transparent rounded appearance-none focus:border-gray-700 focus:outline-none focus:shadow-outline',
}: TextareaProps<T>) => (
  <>
    <div className="flex justify-start items-center">
      <label className="text-gray-700 text-xs font-bold my-1">{fieldLabel}</label>
      {helperText ? <PopOnIcon icon={<IconsQuestion />} content={helperText} /> : null}
      {errMessage ? <span>a</span> : null}
    </div>
    <textarea
      placeholder={placeholder}
      cols={cols}
      rows={rows}
      className={overWriteCSS}
      {...register(label, { required })}
    />
  </>
);
