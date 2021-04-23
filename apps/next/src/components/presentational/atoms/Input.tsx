import { Path, UseFormRegister } from 'react-hook-form';

type InputProps<T> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  fieldLabel: string;
  type: string;
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
  required,
  placeholder = '',
  overWriteCSS = 'flex-grow w-full h-12 px-4 mb-3 text-black transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-deep-purple-900 focus:border-teal-accent-700 focus:outline-none focus:shadow-outline',
}: InputProps<T>) => (
  <>
    <label className="uppercase text-gray-700 text-xs font-bold my-2 mr-auto">{fieldLabel}</label>
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
  fieldLabel,
  label,
  register,
  required,
  placeholder = '',
  overWriteCSS = 'flex-grow w-full h-24 px-4 mb-3 text-black transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-deep-purple-900 focus:border-teal-accent-700 focus:outline-none focus:shadow-outline',
}: TextareaProps<T>) => (
  <>
    <label className="uppercase text-gray-700 text-xs font-bold my-1 mr-auto">{fieldLabel}</label>
    <textarea
      placeholder={placeholder}
      cols={cols}
      rows={rows}
      className={overWriteCSS}
      {...register(label, { required })}
    />
  </>
);
