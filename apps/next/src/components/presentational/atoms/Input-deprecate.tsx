// import { FC, InputHTMLAttributes } from 'react';
// import { UseFormMethods, RegisterOptions, UseFormRegister } from 'react-hook-form';

// type Register = Pick<UseFormRegister, 'register'>;

// interface InputProps extends InputHTMLAttributes<HTMLInputElement>, Partial<Register> {
//   name: string;
//   labeled: boolean;
//   type: string;
//   label?: string;
//   placeholder?: string;
//   required?: boolean;
//   error?: string;
//   rules?: RegisterOptions;
// }

// const Input: FC<InputProps> = ({
//   name,
//   label,
//   labeled,
//   type,
//   placeholder,
//   required,
//   error,
//   rules = {},
//   register,
//   ...additionalInputProps
// }) => {
//   return (
//     <>
//       {labeled ? (
//         <label className="uppercase text-gray-700 text-xs font-bold my-2 mr-auto" htmlFor={name}>
//           {label || name}
//         </label>
//       ) : null}
//       <input
//         id={name}
//         name={name}
//         placeholder={placeholder}
//         required={required}
//         type={type}
//         ref={register && register(rules)}
//         {...additionalInputProps}
//         className="flex-grow w-full h-12 px-4 mb-3 text-black transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-deep-purple-900 focus:border-teal-accent-700 focus:outline-none focus:shadow-outline"
//       />
//     </>
//   );
// };

// export { Input };
