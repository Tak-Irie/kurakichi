/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/button-has-type */
import { Dispatch, FC, ReactElement, SetStateAction } from 'react';

type ButtonProps = {
  type: 'button' | 'submit';
  onClick?: () => void | Dispatch<SetStateAction<any>>;
  color?: 'gray' | 'yellow' | 'blue' | 'green' | 'red';
  disabled?: boolean;
  label?: string | ReactElement;
};

type ButtonWithIconProps = ButtonProps & {
  icon: ReactElement;
};

export const ButtonBig: FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  label,
  color = 'gray',
}) => (
  <div className={`${disabled ? 'opacity-50' : ''}`}>
    <button
      className={`px-4 py-2 border border-gray-200 text-sm rounded-md  text-${color}-700 bg-${color}-50 hover:bg-${color}-100 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-100`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  </div>
);

export const ButtonWithIcon: FC<ButtonWithIconProps> = ({
  type,
  label,
  icon,
  disabled,
  onClick,
}) => (
  <div className={`${disabled ? 'opacity-50' : ''}`}>
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${
        disabled ? 'cursor-not-allowed' : ''
      } w-full whitespace-nowrap flex-nowrap inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
    >
      <div className="inline-flex justify-center items-center mr-2 -ml-1 w-5 h-5 text-gray-400">
        {icon}
      </div>
      {label ? <div>{label}</div> : null}
    </button>
  </div>
);
