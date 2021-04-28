import { FC, ForwardedRef, forwardRef, ReactElement, SyntheticEvent } from 'react';

type ButtonProps = {
  type: 'button' | 'submit';
  onClick?: (e: SyntheticEvent) => void | Promise<void>;
  overwriteCSS?: string;
  disabled?: boolean;
  label?: string | ReactElement;
};

type ButtonWithIconProps = ButtonProps & {
  icon: ReactElement;
};

export const ButtonSmall: FC<ButtonProps> = ({
  type,
  onClick,
  children,
  disabled,
  label,
  overwriteCSS = `${
    disabled ? 'cursor-not-allowed' : ''
  } bg-green-400 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150`,
}) => {
  return (
    <div className={`${disabled ? 'opacity-50' : ''}`}>
      <button className={overwriteCSS} disabled={disabled} type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export const ButtonBig: FC<ButtonProps> = ({
  type,
  onClick,
  children,
  disabled,
  label,
  overwriteCSS = `${
    disabled ? 'cursor-not-allowed' : ''
  } inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`,
}) => {
  return (
    <div className={`${disabled ? 'opacity-50' : ''}`}>
      <button className={overwriteCSS} disabled={disabled} type={type} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export const ButtonWithIcon: FC<ButtonWithIconProps> = ({
  type,
  label,
  icon,
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
        } whitespace-nowrap flex-nowrap inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
      >
        <div className="inline-flex justify-center items-center -ml-1 mr-2 h-5 w-5 text-gray-400">
          {icon}
        </div>
        {label ? <span>{label}</span> : null}
      </button>
    </div>
  );
};
