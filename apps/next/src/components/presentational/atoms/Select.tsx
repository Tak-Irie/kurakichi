import { Path, UseFormRegister } from 'react-hook-form';

type SelectProps<T, U> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  fieldLabel: string;
  options: {
    label: string;
    value: U;
  }[];
};

export const Select = <T extends any, U extends string>({
  label,
  fieldLabel,
  register,
  required,
  options,
}: SelectProps<T, U>) => (
  <>
    <label className="uppercase text-gray-700 text-xs font-bold my-2 mr-auto">{fieldLabel}</label>
    <select
      className="flex-grow w-full h-12 px-4 mb-3 text-black transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-deep-purple-900 focus:border-teal-accent-700 focus:outline-none focus:shadow-outline"
      {...register(label, { required })}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  </>
);
