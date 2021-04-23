import { FC, ForwardedRef, forwardRef, ReactElement, SyntheticEvent } from 'react';

type ButtonProps = {
  type: 'button' | 'submit';
  onClick?: (e: SyntheticEvent) => void | Promise<void>;
  overwriteCSS?: string;
  disabled?: boolean;
};

type ButtonWithIconProps = ButtonProps & {
  icon: ReactElement;
  label?: string;
};

export const ButtonSmall: FC<ButtonProps> = ({
  type,
  onClick,
  children,
  overwriteCSS = 'bg-green-400 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150',
}) => {
  return (
    <button className={overwriteCSS} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonBig: FC<ButtonProps> = ({
  type,
  onClick,
  children,
  overwriteCSS = 'bg-green-400 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none m-2 ease-linear transition-all duration-150',
}) => {
  return (
    <button className={overwriteCSS} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonWithIcon: FC<ButtonWithIconProps> = ({
  type,
  label,
  icon,
  children,
  disabled,
  onClick,
}) => {
  return (
    <div className={`${disabled ? 'opacity-50' : ''}`}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${
          disabled ? 'cursor-not-allowed' : ''
        } inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
      >
        <div className="-ml-1 mr-2 h-5 w-5 text-gray-400">{icon}</div>
        {label ? <span>{label}</span> : null}
      </button>
      {children}
    </div>
  );
};
