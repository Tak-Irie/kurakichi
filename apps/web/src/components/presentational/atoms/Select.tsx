import { Path, UseFormRegister } from 'react-hook-form';

type SelectProps<T extends Record<string, string | number>, U> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  fieldLabel: string;
  options: {
    label: string;
    value: U;
  }[];
};

export const Select = <
  T extends Record<string, string | number>,
  U extends string,
>({
  label,
  fieldLabel,
  register,
  required,
  options,
}: SelectProps<T, U>) => (
  <>
    <label className="my-2 mr-auto text-xs font-bold text-gray-700">
      {fieldLabel}
    </label>
    <select
      className="grow px-4 mb-3 w-full h-12 text-gray-900 rounded border border-gray-400 appearance-none cursor-pointer"
      {...register(label, { required })}
    >
      {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  </>
);
