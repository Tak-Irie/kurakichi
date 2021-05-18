import { useState, Fragment } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';

import { IconsSelector, IconsCheck } from '@next/ui';

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
    <label className="text-gray-700 text-xs font-bold my-2 mr-auto">{fieldLabel}</label>
    <select
      className="cursor-pointer flex-grow w-full h-12 px-4 mb-3 border border-gray-400 appearance-none text-gray-900 rounded"
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
