import { removeConnectionDirectiveFromDocument } from '@apollo/client/utilities';
import React, { FC, InputHTMLAttributes, ReactElement } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

type InputProps<T> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  type: string;
};

export const Input = <T extends any>({ type, label, register, required }: InputProps<T>) => (
  <>
    <label className="uppercase text-gray-700 text-xs font-bold my-2 mr-auto">{label}</label>
    <input
      className="flex-grow w-full h-12 px-4 mb-3 text-black transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-deep-purple-900 focus:border-teal-accent-700 focus:outline-none focus:shadow-outline"
      type={type}
      {...register(label, { required })}
    />
  </>
);
