import { FC, ReactElement } from 'react';

type IconButtonProps = {
  svgIcon: ReactElement;
  label: string;
  onClick?: () => void;
};

const IconButton: FC<IconButtonProps> = (props) => {
  return (
    <button
      type="button"
      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      onClick={props.onClick}
    >
      <div className="-ml-1 mr-2 h-5 w-5 text-gray-400">{props.svgIcon}</div>
      <span>{props.label}</span>
      {props.children}
    </button>
  );
};

export { IconButton };
