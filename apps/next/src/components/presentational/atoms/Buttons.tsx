import { VFC, ReactElement, SyntheticEvent } from 'react';

type ButtonProps = {
  type: 'button' | 'submit';
  onClick?: (e: SyntheticEvent) => void | Promise<void>;
  color?: 'gray' | 'yellow' | 'blue' | 'green' | 'red';
  disabled?: boolean;
  label?: string | ReactElement;
};

type ButtonWithIconProps = ButtonProps & {
  icon: ReactElement;
};

export const ButtonBig: VFC<ButtonProps> = ({ type, onClick, disabled, label, color = 'gray' }) => {
  return (
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
};

export const ButtonWithIcon: VFC<ButtonWithIconProps> = ({
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
        } w-full whitespace-nowrap flex-nowrap inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
      >
        <div className="inline-flex justify-center items-center -ml-1 mr-2 h-5 w-5 text-gray-400">
          {icon}
        </div>
        {label ? <span>{label}</span> : null}
      </button>
    </div>
  );
};
