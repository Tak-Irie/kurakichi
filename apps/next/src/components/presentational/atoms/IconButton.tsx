import { FC, ReactElement } from 'react';

type IconButtonProps = {
  svgIcon: ReactElement;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

const IconButton: FC<IconButtonProps> = ({ label, svgIcon, children, disabled, onClick }) => {
  return (
    <div className={`${disabled ? 'opacity-50' : ''}`}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <div className="-ml-1 mr-2 h-5 w-5 text-gray-400">{svgIcon}</div>
        <span>{label}</span>
      </button>
      {children}
    </div>
  );
};

export { IconButton };
