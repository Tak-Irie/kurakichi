import { FieldError, FieldErrors, Path, UseFormRegister } from 'react-hook-form';

import { PopOnIcon } from '@next/ui';
import { IconsQuestion } from './Icons';

type InputProps<T> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  fieldLabel: string;
  type: string;
  helperText?: string;
  errMessage?: string | FieldError;
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
  fieldLabel,
  register,
  helperText,
  errMessage,
  required,
  placeholder = '',
  overWriteCSS = 'flex-grow w-full h-12 px-4 mb-3 text-black transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-deep-purple-900 focus:border-teal-accent-700 focus:outline-none focus:shadow-outline',
}: InputProps<T>) => (
  <>
    <div className="flex justify-start items-center">
      <label className="text-gray-700 text-xs font-bold my-1">{fieldLabel}</label>
      <span className="ml-1">
        {helperText ? <PopOnIcon icon={<IconsQuestion />} content={helperText} /> : null}
      </span>
      <span className="ml-1 text-red-500 text-xs">
        {errMessage ? errMessage : required ? '必須項目' : null}
      </span>
    </div>
    <input
      className={overWriteCSS}
      placeholder={placeholder}
      type={type}
      {...register(label, { required })}
    />
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
  overWriteCSS = 'flex-grow w-full h-24 px-4 mb-3 text-black transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-deep-purple-900 focus:border-teal-accent-700 focus:outline-none focus:shadow-outline',
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
